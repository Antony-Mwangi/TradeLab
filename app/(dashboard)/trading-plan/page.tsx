// app/trading-plan/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Target,
  Plus,
  Trash2,
  Save,
  X,
  TrendingUp,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle2,
  Brain,
  FileText,
  Copy,
  Printer,
  ChevronDown,
  ChevronUp,
  Ban,
  Lightbulb,
  BookMarked,
  Download,
} from "lucide-react";

// ===== Collapsible Section Component =====
function Section({
  number,
  title,
  icon: Icon,
  color,
  defaultOpen = true,
  children,
}: {
  number: number;
  title: string;
  icon: any;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colorMap: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
    },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
    },
    rose: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/20",
    },
    cyan: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
    },
  };
  const c = colorMap[color] || colorMap.emerald;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all hover:border-slate-700">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/30 transition"
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg} ${c.text} border ${c.border}`}
          >
            <Icon size={16} />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Section {number}
            </p>
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>
        </div>
        {open ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-800">
          {children}
        </div>
      )}
    </div>
  );
}

// ===== Tag Input Component =====
function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder,
  color = "emerald",
}: {
  tags: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
  color?: string;
}) {
  const [input, setInput] = useState("");
  const colorMap: Record<string, string> = {
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    blue: "border-blue-500/20 bg-blue-500/5 text-blue-400",
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-400",
    purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
    rose: "border-rose-500/20 bg-rose-500/5 text-rose-400",
  };
  const c = colorMap[color] || colorMap.emerald;

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), handleAdd())
          }
          className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700 transition"
        >
          <Plus size={14} />
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs ${c} group`}
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="ml-1 text-slate-500 hover:text-red-400 transition opacity-60 group-hover:opacity-100"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Numbered List Input =====
function RuleListInput({
  rules,
  onAdd,
  onRemove,
  placeholder,
  color = "emerald",
}: {
  rules: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
  color?: string;
}) {
  const [input, setInput] = useState("");
  const colorMap: Record<string, { bg: string; text: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400" },
  };
  const c = colorMap[color] || colorMap.emerald;

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), handleAdd())
          }
          className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-xl bg-slate-800 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700 transition"
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="space-y-1.5">
        {rules.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/30 px-4 py-6 text-center">
            <p className="text-xs text-slate-500">
              No rules added yet. Type above and press Enter or click +.
            </p>
          </div>
        )}
        {rules.map((rule, i) => (
          <div
            key={i}
            className="group flex items-start gap-3 text-sm bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${c.bg} ${c.text}`}
            >
              {i + 1}
            </span>
            <span className="text-slate-300 flex-1 text-sm leading-relaxed">
              {rule}
            </span>
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-slate-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TradingPlanPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [copiedIndicator, setCopiedIndicator] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    planName: "My Trading Plan",
    version: "1.0",
    markets: [] as string[],
    instruments: [] as string[],
    preferredSessions: [] as string[],
    tradingHours: { start: "08:00", end: "16:00" },
    strategies: [] as any[],
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
    psychologyRules: { beforeTrading: [] as string[], afterLoss: [] as string[] },
    noTradeConditions: [] as string[],
    dailyRoutine: {
      beforeMarket: [] as string[],
      duringMarket: [] as string[],
      afterMarket: [] as string[],
    },
  });

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
      riskManagement: {
        maxRiskPerTrade: 1.0,
        maxDailyLoss: 3.0,
        maxWeeklyLoss: 6.0,
        maxTradesPerDay: 3,
        minRiskReward: "1:2",
        maxOpenPositions: 2,
      },
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
      const payload = activePlanId
        ? { ...formData, _id: activePlanId }
        : formData;
      const res = await fetch("/api/trading-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setActivePlanId(data.plan._id);
        fetchPlans();
        setSavedIndicator(true);
        setTimeout(() => setSavedIndicator(false), 2500);
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

  const copyToClipboard = async () => {
    const text = generatePlainText();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndicator(true);
      setTimeout(() => setCopiedIndicator(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const generatePlainText = () => {
    let text = `${formData.planName}\nVersion ${formData.version}\n`;
    text += `${"=".repeat(40)}\n\n`;
    if (formData.markets.length)
      text += `MARKETS\n${formData.markets.join(", ")}\n\n`;
    if (formData.instruments.length)
      text += `INSTRUMENTS\n${formData.instruments.join(", ")}\n\n`;
    if (formData.preferredSessions.length)
      text += `SESSIONS\n${formData.preferredSessions.join(", ")} (${
        formData.tradingHours.start
      } - ${formData.tradingHours.end})\n\n`;
    text += `RISK MANAGEMENT\n`;
    text += `• Max Risk/Trade: ${formData.riskManagement.maxRiskPerTrade}%\n`;
    text += `• Max Daily Loss: ${formData.riskManagement.maxDailyLoss}%\n`;
    text += `• Max Weekly Loss: ${formData.riskManagement.maxWeeklyLoss}%\n`;
    text += `• Max Trades/Day: ${formData.riskManagement.maxTradesPerDay}\n`;
    text += `• Max Open Positions: ${formData.riskManagement.maxOpenPositions}\n`;
    text += `• Min R:R: ${formData.riskManagement.minRiskReward}\n\n`;
    if (formData.entryRules.length)
      text += `ENTRY RULES\n${formData.entryRules
        .map((r, i) => `${i + 1}. ${r}`)
        .join("\n")}\n\n`;
    if (formData.noTradeConditions.length)
      text += `NO-TRADE CONDITIONS\n${formData.noTradeConditions
        .map((c, i) => `${i + 1}. ${c}`)
        .join("\n")}\n\n`;
    if (formData.psychologyRules.beforeTrading.length) {
      text += `PSYCHOLOGY - BEFORE TRADING\n${formData.psychologyRules.beforeTrading
        .map((r, i) => `${i + 1}. ${r}`)
        .join("\n")}\n\n`;
    }
    if (formData.psychologyRules.afterLoss.length) {
      text += `PSYCHOLOGY - AFTER A LOSS\n${formData.psychologyRules.afterLoss
        .map((r, i) => `${i + 1}. ${r}`)
        .join("\n")}\n`;
    }
    return text;
  };

  const printPlan = () => {
    window.print();
  };

  // Check if plan has any content
  const hasContent =
    formData.markets.length > 0 ||
    formData.instruments.length > 0 ||
    formData.preferredSessions.length > 0 ||
    formData.entryRules.length > 0 ||
    formData.noTradeConditions.length > 0 ||
    formData.psychologyRules.beforeTrading.length > 0 ||
    formData.psychologyRules.afterLoss.length > 0;

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">Loading trading plans...</p>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-emerald-400" />
          <p className="text-sm font-medium text-emerald-400">
            Rules & Discipline
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Trading Plan Workspace
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          Define your rules, risk parameters, and discipline framework. Edit on
          the left, see the live document on the right.
        </p>
      </section>

      {/* Plan Selector Bar */}
      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {plans.length === 0 ? (
                <p className="text-xs text-slate-500 italic px-2">
                  No saved plans — click "New Plan" to begin.
                </p>
              ) : (
                plans.map((p) => (
                  <div key={p._id} className="flex items-center gap-1">
                    <button
                      onClick={() => handleSelectPlan(p)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium border transition whitespace-nowrap ${
                        activePlanId === p._id
                          ? "bg-emerald-500 text-slate-950 border-emerald-500 font-semibold shadow-lg shadow-emerald-500/20"
                          : "bg-slate-950/50 text-slate-300 border-slate-800 hover:bg-slate-900 hover:border-slate-700"
                      }`}
                    >
                      <FileText size={12} />
                      {p.planName}
                    </button>
                    {activePlanId === p._id && plans.length > 1 && (
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="rounded-lg p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                        title="Delete Plan"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleNewPlan}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-2 text-xs font-medium text-emerald-400 hover:bg-slate-900 hover:border-emerald-500/30 transition"
            >
              <Plus size={14} /> New Plan
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              {savedIndicator ? (
                <>
                  <CheckCircle2 size={14} /> Saved!
                </>
              ) : (
                <>
                  <Save size={14} /> {saving ? "Saving..." : "Save Plan"}
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Split View */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left: Form Editor */}
        <div className="lg:col-span-7 space-y-4">
          {/* Section 1: Basic Info */}
          <Section number={1} title="Plan Basics" icon={FileText} color="emerald">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1.5">
                  Plan Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.planName}
                  onChange={(e) =>
                    setFormData({ ...formData, planName: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
                  placeholder="e.g., 2026 Scalping Plan"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1.5">
                  Version
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
                  placeholder="1.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-2">
                  Markets
                </label>
                <TagInput
                  tags={formData.markets}
                  onAdd={(v) =>
                    setFormData({ ...formData, markets: [...formData.markets, v] })
                  }
                  onRemove={(i) =>
                    setFormData({
                      ...formData,
                      markets: formData.markets.filter((_, idx) => idx !== i),
                    })
                  }
                  placeholder="e.g., Forex"
                  color="emerald"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-2">
                  Instruments
                </label>
                <TagInput
                  tags={formData.instruments}
                  onAdd={(v) =>
                    setFormData({
                      ...formData,
                      instruments: [...formData.instruments, v],
                    })
                  }
                  onRemove={(i) =>
                    setFormData({
                      ...formData,
                      instruments: formData.instruments.filter(
                        (_, idx) => idx !== i
                      ),
                    })
                  }
                  placeholder="e.g., EUR/USD"
                  color="blue"
                />
              </div>
            </div>
          </Section>

          {/* Section 2: Sessions */}
          <Section
            number={2}
            title="Sessions & Hours"
            icon={Clock}
            color="blue"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-2">
                  Preferred Sessions
                </label>
                <div className="space-y-2">
                  {["London", "New York", "Asian"].map((session) => {
                    const checked =
                      formData.preferredSessions.includes(session);
                    return (
                      <label
                        key={session}
                        className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
                          checked
                            ? "border-blue-500/30 bg-blue-500/5"
                            : "border-slate-800 bg-slate-950 hover:border-slate-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const sessions = e.target.checked
                              ? [...formData.preferredSessions, session]
                              : formData.preferredSessions.filter(
                                  (s) => s !== session
                                );
                            setFormData({
                              ...formData,
                              preferredSessions: sessions,
                            });
                          }}
                          className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-300 font-medium">
                          {session}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-2">
                  Trading Hours
                </label>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">
                      Start
                    </p>
                    <input
                      type="time"
                      value={formData.tradingHours.start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tradingHours: {
                            ...formData.tradingHours,
                            start: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">
                      End
                    </p>
                    <input
                      type="time"
                      value={formData.tradingHours.end}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tradingHours: {
                            ...formData.tradingHours,
                            end: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Section 3: Risk Management */}
          <Section
            number={3}
            title="Risk Management"
            icon={Shield}
            color="rose"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  key: "maxRiskPerTrade",
                  label: "Max Risk / Trade (%)",
                  step: "0.1",
                },
                {
                  key: "maxDailyLoss",
                  label: "Max Daily Loss (%)",
                  step: "0.5",
                },
                {
                  key: "maxWeeklyLoss",
                  label: "Max Weekly Loss (%)",
                  step: "1",
                },
                {
                  key: "maxTradesPerDay",
                  label: "Max Trades / Day",
                  step: "1",
                },
                {
                  key: "maxOpenPositions",
                  label: "Max Open Positions",
                  step: "1",
                },
                {
                  key: "minRiskReward",
                  label: "Min R:R Ratio",
                  step: undefined,
                },
              ].map(({ key, label, step }) => (
                <div key={key}>
                  <label className="text-[10px] font-medium text-slate-400 block mb-1.5">
                    {label}
                  </label>
                  <input
                    type={key === "minRiskReward" ? "text" : "number"}
                    step={step}
                    value={(formData.riskManagement as any)[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        riskManagement: {
                          ...formData.riskManagement,
                          [key]:
                            key === "minRiskReward"
                              ? e.target.value
                              : Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500/50 transition"
                  />
                </div>
              ))}
            </div>
            {formData.riskManagement.maxRiskPerTrade > 2 && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                <AlertCircle
                  size={14}
                  className="text-amber-400 shrink-0 mt-0.5"
                />
                <p className="text-xs text-amber-400">
                  Warning: Risk per trade above 2% increases your chances of
                  significant drawdown.
                </p>
              </div>
            )}
          </Section>

          {/* Section 4: Entry Rules */}
          <Section
            number={4}
            title="Entry Rules"
            icon={CheckCircle2}
            color="emerald"
          >
            <RuleListInput
              rules={formData.entryRules}
              onAdd={(v) =>
                setFormData({
                  ...formData,
                  entryRules: [...formData.entryRules, v],
                })
              }
              onRemove={(i) =>
                setFormData({
                  ...formData,
                  entryRules: formData.entryRules.filter(
                    (_, idx) => idx !== i
                  ),
                })
              }
              placeholder="e.g., Price must be above 200 EMA"
              color="emerald"
            />
          </Section>

          {/* Section 5: No-Trade Conditions */}
          <Section
            number={5}
            title="No-Trade Conditions"
            icon={Ban}
            color="amber"
          >
            <RuleListInput
              rules={formData.noTradeConditions}
              onAdd={(v) =>
                setFormData({
                  ...formData,
                  noTradeConditions: [...formData.noTradeConditions, v],
                })
              }
              onRemove={(i) =>
                setFormData({
                  ...formData,
                  noTradeConditions: formData.noTradeConditions.filter(
                    (_, idx) => idx !== i
                  ),
                })
              }
              placeholder="e.g., No trades during major news"
              color="amber"
            />
          </Section>

          {/* Section 6: Psychology Rules */}
          <Section
            number={6}
            title="Psychology & Discipline"
            icon={Brain}
            color="purple"
            defaultOpen={false}
          >
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">
                  Before Trading
                </p>
                <RuleListInput
                  rules={formData.psychologyRules.beforeTrading}
                  onAdd={(v) =>
                    setFormData({
                      ...formData,
                      psychologyRules: {
                        ...formData.psychologyRules,
                        beforeTrading: [
                          ...formData.psychologyRules.beforeTrading,
                          v,
                        ],
                      },
                    })
                  }
                  onRemove={(i) =>
                    setFormData({
                      ...formData,
                      psychologyRules: {
                        ...formData.psychologyRules,
                        beforeTrading:
                          formData.psychologyRules.beforeTrading.filter(
                            (_, idx) => idx !== i
                          ),
                      },
                    })
                  }
                  placeholder="e.g., Meditate for 5 minutes"
                  color="purple"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">
                  After a Loss
                </p>
                <RuleListInput
                  rules={formData.psychologyRules.afterLoss}
                  onAdd={(v) =>
                    setFormData({
                      ...formData,
                      psychologyRules: {
                        ...formData.psychologyRules,
                        afterLoss: [...formData.psychologyRules.afterLoss, v],
                      },
                    })
                  }
                  onRemove={(i) =>
                    setFormData({
                      ...formData,
                      psychologyRules: {
                        ...formData.psychologyRules,
                        afterLoss: formData.psychologyRules.afterLoss.filter(
                          (_, idx) => idx !== i
                        ),
                      },
                    })
                  }
                  placeholder="e.g., Step away for 30 minutes"
                  color="purple"
                />
              </div>
            </div>
          </Section>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/60 overflow-hidden shadow-xl backdrop-blur">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/50 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] tracking-widest uppercase text-emerald-400 font-bold">
                  Live Preview
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Copy plan"
                >
                  {copiedIndicator ? (
                    <CheckCircle2 size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
                <button
                  onClick={printPlan}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Print plan"
                >
                  <Printer size={14} />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {!hasContent ? (
                <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/50">
                    <Lightbulb size={22} className="text-slate-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-300 mb-1">
                    Your plan will appear here
                  </p>
                  <p className="text-xs text-slate-500">
                    Start filling in the sections on the left and watch your
                    trading plan come to life.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                      {formData.planName || "Unnamed Plan"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Version {formData.version || "1.0"} · Draft
                    </p>
                  </div>

                  {/* Markets */}
                  {(formData.markets.length > 0 ||
                    formData.instruments.length > 0) && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">
                        Markets & Instruments
                      </h4>
                      {formData.markets.length > 0 && (
                        <p className="text-sm text-white font-medium">
                          {formData.markets.join(" • ")}
                        </p>
                      )}
                      {formData.instruments.length > 0 && (
                        <p className="text-xs text-slate-400 mt-1">
                          {formData.instruments.join(", ")}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Sessions */}
                  {formData.preferredSessions.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-2">
                        Trading Session
                      </h4>
                      <p className="text-sm text-white font-medium">
                        {formData.preferredSessions.join(" & ")} Session
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {formData.tradingHours.start} —{" "}
                        {formData.tradingHours.end}
                      </p>
                    </div>
                  )}

                  {/* Risk Management */}
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mb-2">
                      Risk Management
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {
                          l: "Risk/Trade",
                          v: `${formData.riskManagement.maxRiskPerTrade}%`,
                        },
                        {
                          l: "Max Daily Loss",
                          v: `${formData.riskManagement.maxDailyLoss}%`,
                        },
                        {
                          l: "Max Weekly Loss",
                          v: `${formData.riskManagement.maxWeeklyLoss}%`,
                        },
                        {
                          l: "Max Trades/Day",
                          v: formData.riskManagement.maxTradesPerDay,
                        },
                        {
                          l: "Max Open",
                          v: formData.riskManagement.maxOpenPositions,
                        },
                        {
                          l: "Min R:R",
                          v: formData.riskManagement.minRiskReward,
                        },
                      ].map(({ l, v }) => (
                        <div
                          key={l}
                          className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2"
                        >
                          <p className="text-[10px] text-slate-500 uppercase">
                            {l}
                          </p>
                          <p className="text-sm font-bold text-white mt-0.5">
                            {v}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entry Rules */}
                  {formData.entryRules.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">
                        Entry Rules
                      </h4>
                      <ol className="space-y-1.5">
                        {formData.entryRules.map((rule, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-emerald-500/20 text-[9px] font-bold text-emerald-400 mt-0.5">
                              {i + 1}
                            </span>
                            {rule}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* No-Trade Conditions */}
                  {formData.noTradeConditions.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-2">
                        No-Trade Conditions
                      </h4>
                      <ol className="space-y-1.5">
                        {formData.noTradeConditions.map((c, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[9px] font-bold text-amber-400 mt-0.5">
                              {i + 1}
                            </span>
                            {c}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Psychology */}
                  {(formData.psychologyRules.beforeTrading.length > 0 ||
                    formData.psychologyRules.afterLoss.length > 0) && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-2">
                        Psychology Rules
                      </h4>
                      {formData.psychologyRules.beforeTrading.length > 0 && (
                        <div className="mb-3">
                          <p className="text-[10px] text-slate-500 uppercase mb-1">
                            Before Trading
                          </p>
                          <ul className="space-y-1">
                            {formData.psychologyRules.beforeTrading.map(
                              (r, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-slate-300 flex items-start gap-2"
                                >
                                  <span className="mt-1.5 h-1 w-1 rounded-full bg-purple-400 shrink-0" />
                                  {r}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {formData.psychologyRules.afterLoss.length > 0 && (
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase mb-1">
                            After Loss
                          </p>
                          <ul className="space-y-1">
                            {formData.psychologyRules.afterLoss.map((r, i) => (
                              <li
                                key={i}
                                className="text-sm text-slate-300 flex items-start gap-2"
                              >
                                <span className="mt-1.5 h-1 w-1 rounded-full bg-purple-400 shrink-0" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 bg-slate-950/50 px-5 py-3 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Draft Preview
              </span>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
              >
                {savedIndicator ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <Save size={13} />
                )}
                {savedIndicator ? "Saved!" : saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}