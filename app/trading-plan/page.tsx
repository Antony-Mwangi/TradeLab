// src/app/trading-plan/page.tsx
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
  Target,
  TrendingUp,
  X,
  Plus,
  Trash2,
  Save,
  Edit3,
} from "lucide-react";

export default function TradingPlanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    planName: "My Trading Plan",
    version: "1.0",
    markets: [] as string[],
    instruments: [] as string[],
    preferredSessions: [] as string[],
    tradingHours: { start: "08:00", end: "16:00" },
    strategies: [] as { name: string; marketCondition: string[]; entryConditions: string[]; confirmation: string[]; status: "Active" | "Archived" }[],
    riskManagement: {
      maxRiskPerTrade: 1.0,
      maxDailyLoss: 3.0,
      maxWeeklyLoss: 6.0,
      maxTradesPerDay: 3,
      minRiskReward: "1:2",
      maxOpenPositions: 2,
    },
    entryRules: [] as string[],
    exitRules: {
      takeProfit: [] as string[],
      stopLoss: [] as string[],
      earlyExitRules: [] as string[],
    },
    psychologyRules: {
      beforeTrading: [] as string[],
      afterLoss: [] as string[],
    },
    noTradeConditions: [] as string[],
    dailyRoutine: {
      beforeMarket: [] as string[],
      duringMarket: [] as string[],
      afterMarket: [] as string[],
    },
  });

  // Temporary Inputs
  const [newMarket, setNewMarket] = useState("");
  const [newInstrument, setNewInstrument] = useState("");
  const [newEntryRule, setNewEntryRule] = useState("");
  const [newNoTrade, setNewNoTrade] = useState("");
  const [newBeforePsych, setNewBeforePsych] = useState("");
  const [newAfterLossPsych, setNewAfterLossPsych] = useState("");
  const [newStrategyName, setNewStrategyName] = useState("");
  const [newStrategyCondition, setNewStrategyCondition] = useState("");
  const [newStrategyEntry, setNewStrategyEntry] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPlans();
    }
  }, [status]);

  const fetchPlans = () => {
    setLoading(true);
    fetch("/api/trading-plan")
      .then((res) => res.json())
      .then((data) => {
        if (data.plans) {
          setPlans(data.plans);
          if (data.plans.length > 0 && !activePlanId) {
            // Default to selecting the first plan
            setActivePlanId(data.plans[0]._id);
            setFormData(data.plans[0]);
          }
        }
      })
      .catch((err) => console.error("Failed to load trading plans", err))
      .finally(() => setLoading(false));
  };

  const handleSelectPlan = (plan: any) => {
    setActivePlanId(plan._id);
    setFormData(plan);
  };

  const handleNewPlan = () => {
    setActivePlanId(null);
    setFormData({
      planName: "New Trading Plan",
      version: "1.0",
      markets: [],
      instruments: [],
      preferredSessions: [],
      tradingHours: { start: "08:00", end: "16:00" },
      strategies: [],
      riskManagement: { maxRiskPerTrade: 1.0, maxDailyLoss: 3.0, maxWeeklyLoss: 6.0, maxTradesPerDay: 3, minRiskReward: "1:2", maxOpenPositions: 2 },
      entryRules: [],
      exitRules: { takeProfit: [], stopLoss: [], earlyExitRules: [] },
      psychologyRules: { beforeTrading: [], afterLoss: [] },
      noTradeConditions: [],
      dailyRoutine: { beforeMarket: [], duringMarket: [], afterMarket: [] },
    });
  };

  const handleSave = async () => {
    if (!formData.planName.trim()) {
      alert("Please enter a plan name.");
      return;
    }
    setSaving(true);
    try {
      const payload = activePlanId ? { ...formData, _id: activePlanId } : formData;
      const res = await fetch("/api/trading-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setActivePlanId(data.plan._id);
        fetchPlans();
        alert("Trading plan saved successfully!");
      } else {
        alert("Failed to save trading plan");
      }
    } catch (err) {
      console.error("Error saving plan:", err);
      alert("Error saving trading plan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this trading plan?")) return;
    try {
      const res = await fetch(`/api/trading-plan/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        const remaining = plans.filter((p) => p._id !== id);
        setPlans(remaining);
        if (remaining.length > 0) {
          handleSelectPlan(remaining[0]);
        } else {
          handleNewPlan();
        }
      }
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading trading plans...</p>
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
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
            >
              <Save size={15} /> {saving ? "Saving..." : "Save Trading Plan"}
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Plan Selector Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Trading Plan Workspace</h1>
              <p className="text-xs text-slate-400 mt-1">Edit your rules on the left and view the live plain-text document preview on the right.</p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={handleNewPlan}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs font-medium text-emerald-400 hover:bg-slate-800 shrink-0"
              >
                <Plus size={14} /> New Plan
              </button>
              {plans.map((p) => (
                <div key={p._id} className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleSelectPlan(p)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-medium border transition ${
                      activePlanId === p._id
                        ? "bg-emerald-500 text-slate-950 border-emerald-500 font-semibold"
                        : "bg-slate-900/50 text-slate-300 border-slate-800 hover:bg-slate-900"
                    }`}
                  >
                    {p.planName}
                  </button>
                  {activePlanId === p._id && (
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Delete Plan"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Split View: Form Editor (Left) & Live Plain-Text Preview (Right) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left Column: Form Editor */}
            <div className="lg:col-span-7 space-y-6">
              {/* Basic Details */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">1. Plan Name & Basics</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Plan Name *</label>
                    <input
                      type="text"
                      value={formData.planName}
                      onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Version</label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2 border-t border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 block mb-2">Markets</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add Market..."
                        value={newMarket}
                        onChange={(e) => setNewMarket(e.target.value)}
                        className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={() => {
                          if (newMarket.trim()) {
                            setFormData({ ...formData, markets: [...formData.markets, newMarket.trim()] });
                            setNewMarket("");
                          }
                        }}
                        className="rounded-xl bg-slate-800 px-3 py-2 text-xs text-white hover:bg-slate-700"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.markets.map((m, i) => (
                        <span key={i} className="flex items-center gap-1 rounded-lg bg-slate-950 border border-slate-800 px-2 py-1 text-xs text-slate-300">
                          {m} <button onClick={() => setFormData({ ...formData, markets: formData.markets.filter((_, idx) => idx !== i) })} className="text-slate-500 hover:text-red-400"><X size={11} /></button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-2">Instruments</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add Instrument..."
                        value={newInstrument}
                        onChange={(e) => setNewInstrument(e.target.value)}
                        className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={() => {
                          if (newInstrument.trim()) {
                            setFormData({ ...formData, instruments: [...formData.instruments, newInstrument.trim()] });
                            setNewInstrument("");
                          }
                        }}
                        className="rounded-xl bg-slate-800 px-3 py-2 text-xs text-white hover:bg-slate-700"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.instruments.map((inst, i) => (
                        <span key={i} className="flex items-center gap-1 rounded-lg bg-slate-950 border border-slate-800 px-2 py-1 text-xs text-slate-300">
                          {inst} <button onClick={() => setFormData({ ...formData, instruments: formData.instruments.filter((_, idx) => idx !== i) })} className="text-slate-500 hover:text-red-400"><X size={11} /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessions & Hours */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">2. Trading Sessions & Hours</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-400 block mb-2">Preferred Sessions</label>
                    <div className="flex gap-4">
                      {["London", "New York", "Asian"].map((session) => (
                        <label key={session} className="flex items-center gap-2 text-xs text-slate-300">
                          <input
                            type="checkbox"
                            checked={formData.preferredSessions.includes(session)}
                            onChange={(e) => {
                              const sessions = e.target.checked
                                ? [...formData.preferredSessions, session]
                                : formData.preferredSessions.filter((s) => s !== session);
                              setFormData({ ...formData, preferredSessions: sessions });
                            }}
                            className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-0"
                          />
                          {session}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Start Time</label>
                      <input
                        type="time"
                        value={formData.tradingHours.start}
                        onChange={(e) => setFormData({ ...formData, tradingHours: { ...formData.tradingHours, start: e.target.value } })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">End Time</label>
                      <input
                        type="time"
                        value={formData.tradingHours.end}
                        onChange={(e) => setFormData({ ...formData, tradingHours: { ...formData.tradingHours, end: e.target.value } })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Management */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">3. Risk Management</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Max Risk / Trade (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.riskManagement.maxRiskPerTrade}
                      onChange={(e) => setFormData({ ...formData, riskManagement: { ...formData.riskManagement, maxRiskPerTrade: Number(e.target.value) } })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Max Daily Loss (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.riskManagement.maxDailyLoss}
                      onChange={(e) => setFormData({ ...formData, riskManagement: { ...formData.riskManagement, maxDailyLoss: Number(e.target.value) } })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Max Trades / Day</label>
                    <input
                      type="number"
                      value={formData.riskManagement.maxTradesPerDay}
                      onChange={(e) => setFormData({ ...formData, riskManagement: { ...formData.riskManagement, maxTradesPerDay: Number(e.target.value) } })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Min Risk/Reward</label>
                    <input
                      type="text"
                      value={formData.riskManagement.minRiskReward}
                      onChange={(e) => setFormData({ ...formData, riskManagement: { ...formData.riskManagement, minRiskReward: e.target.value } })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Entry Rules */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">4. Entry Rules</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add Entry Rule..."
                    value={newEntryRule}
                    onChange={(e) => setNewEntryRule(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (newEntryRule.trim()) {
                        setFormData({ ...formData, entryRules: [...formData.entryRules, newEntryRule.trim()] });
                        setNewEntryRule("");
                      }
                    }}
                    className="rounded-xl bg-slate-800 px-3 py-2 text-xs text-white hover:bg-slate-700"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.entryRules.map((rule, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                      <span className="text-slate-300">{i + 1}. {rule}</span>
                      <button onClick={() => setFormData({ ...formData, entryRules: formData.entryRules.filter((_, idx) => idx !== i) })} className="text-slate-500 hover:text-red-400"><X size={13} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* No-Trade Conditions */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">5. No-Trade Conditions</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add No-Trade Condition..."
                    value={newNoTrade}
                    onChange={(e) => setNewNoTrade(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (newNoTrade.trim()) {
                        setFormData({ ...formData, noTradeConditions: [...formData.noTradeConditions, newNoTrade.trim()] });
                        setNewNoTrade("");
                      }
                    }}
                    className="rounded-xl bg-slate-800 px-3 py-2 text-xs text-white hover:bg-slate-700"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.noTradeConditions.map((cond, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                      <span className="text-slate-300">{i + 1}. {cond}</span>
                      <button onClick={() => setFormData({ ...formData, noTradeConditions: formData.noTradeConditions.filter((_, idx) => idx !== i) })} className="text-slate-500 hover:text-red-400"><X size={13} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Plain-Text Preview (Sticky) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 font-mono text-slate-300 space-y-6 shadow-xl backdrop-blur">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-emerald-400 font-bold mb-1">Live Plan Document</p>
                  <h2 className="text-xl font-bold text-white font-sans">{formData.planName || "Unnamed Plan"}</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-sans">Version {formData.version || "1.0"}</p>
                </div>

                {formData.markets.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Markets & Instruments</h4>
                    <p className="text-xs text-white">{formData.markets.join(" • ")}</p>
                    {formData.instruments.length > 0 && <p className="text-[11px] text-slate-400">{formData.instruments.join(", ")}</p>}
                  </div>
                )}

                {formData.preferredSessions.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Trading Session</h4>
                    <p className="text-xs text-white">{formData.preferredSessions.join(" & ")} Session ({formData.tradingHours.start} – {formData.tradingHours.end})</p>
                  </div>
                )}

                {formData.riskManagement && (
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Risk Management</h4>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                      <p>Risk/trade: <span className="text-white font-bold">{formData.riskManagement.maxRiskPerTrade}%</span></p>
                      <p>Max daily loss: <span className="text-white font-bold">{formData.riskManagement.maxDailyLoss}%</span></p>
                      <p>Max trades/day: <span className="text-white font-bold">{formData.riskManagement.maxTradesPerDay}</span></p>
                      <p>Min risk/reward: <span className="text-white font-bold">{formData.riskManagement.minRiskReward}</span></p>
                    </div>
                  </div>
                )}

                {formData.entryRules.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Entry Rules</h4>
                    <ul className="list-decimal list-inside text-xs space-y-1 text-slate-200">
                      {formData.entryRules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {formData.noTradeConditions.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">No-Trade Conditions</h4>
                    <ul className="list-decimal list-inside text-xs space-y-1 text-slate-200">
                      {formData.noTradeConditions.map((cond, i) => (
                        <li key={i}>{cond}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Status: Draft / Live Preview</span>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Plan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}