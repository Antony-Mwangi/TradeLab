// app/journal/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
  Brain,
  Calculator,
  ChevronDown,
  ChevronUp,
  Upload,
  Trash2,
  Percent,
} from "lucide-react";

// Session options
const SESSIONS = [
  { value: "london", label: "London" },
  { value: "new_york", label: "New York" },
  { value: "asian", label: "Asian" },
  { value: "sydney", label: "Sydney" },
  { value: "other", label: "Other" },
];

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

const SETUPS = [
  "Breakout",
  "Pullback",
  "Reversal",
  "Range",
  "Trend Continuation",
  "Supply & Demand",
  "Order Block",
  "Fair Value Gap",
  "Liquidity Grab",
  "Other",
];

// ===== Collapsible Section =====
function Section({
  title,
  icon: Icon,
  color,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: any;
  color: "emerald" | "blue" | "amber" | "purple" | "rose";
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition hover:border-slate-700">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-800/30 transition"
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${colorMap[color]}`}
          >
            <Icon size={16} />
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
        {open ? (
          <ChevronUp size={18} className="text-slate-400" />
        ) : (
          <ChevronDown size={18} className="text-slate-400" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-800">
          {children}
        </div>
      )}
    </div>
  );
}

export default function NewJournalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    asset: "",
    assetType: "forex",
    tradeType: "BUY",
    entryPrice: "",
    stopLoss: "",
    takeProfit: "",
    exitPrice: "",
    positionSize: "",
    riskPercent: "",
    accountBalance: "",
    riskAmount: "",
    pnl: "",
    resultR: "",
    setup: "",
    session: "new_york",
    marketStructure: "",
    entryReason: "",
    emotion: "Calm",
    emotionalIntensity: 3,
    rulesFollowed: true,
    planFollowed: true,
    notes: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Auto-calculate risk amount
  useEffect(() => {
    if (formData.riskPercent && formData.accountBalance) {
      const riskAmount =
        (parseFloat(formData.riskPercent) / 100) *
        parseFloat(formData.accountBalance);
      setFormData((prev) => ({ ...prev, riskAmount: riskAmount.toFixed(2) }));
    }
  }, [formData.riskPercent, formData.accountBalance]);

  // Auto-calculate R-Multiple
  useEffect(() => {
    if (formData.entryPrice && formData.stopLoss && formData.exitPrice) {
      const entry = parseFloat(formData.entryPrice);
      const stop = parseFloat(formData.stopLoss);
      const exit = parseFloat(formData.exitPrice);

      const risk = Math.abs(entry - stop);
      if (risk > 0) {
        const reward =
          formData.tradeType === "BUY" ? exit - entry : entry - exit;
        const rMultiple = reward / risk;
        setFormData((prev) => ({ ...prev, resultR: rMultiple.toFixed(2) }));
      }
    }
  }, [
    formData.entryPrice,
    formData.stopLoss,
    formData.exitPrice,
    formData.tradeType,
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);

          setImagePreview(compressedDataUrl);
          setFormData((prev) => ({ ...prev, imageUrl: compressedDataUrl }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save journal entry");
      }

      router.push("/journal");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">Loading entry form...</p>
      </div>
    );
  }

  // Check P&L direction
  const pnlValue = formData.pnl ? parseFloat(formData.pnl) : 0;
  const isProfit = pnlValue >= 0;
  const rValue = formData.resultR ? parseFloat(formData.resultR) : 0;

  return (
    <>
      {/* Page Header */}
      <section className="mb-6">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition group mb-4"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Journal
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-emerald-400" />
          <p className="text-sm font-medium text-emerald-400">
            New Trade Entry
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Record New Trade
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          Enter your execution details, chart screenshot, and strategy notes.
        </p>
      </section>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Section 1: Basic Info */}
        <Section title="Basic Information" icon={Target} color="emerald">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Asset / Ticker <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="asset"
                required
                placeholder="e.g. EURUSD or BTCUSDT"
                value={formData.asset}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Asset Type
              </label>
              <select
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none cursor-pointer"
              >
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
                <option value="stocks">Stocks</option>
                <option value="indices">Indices</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Trade Direction
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["BUY", "SELL"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, tradeType: type })
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition ${
                      formData.tradeType === type
                        ? type === "BUY"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border-red-500/40 bg-red-500/10 text-red-400"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {type === "BUY" ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Session
              </label>
              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none cursor-pointer"
              >
                {SESSIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        {/* Section 2: Price Information */}
        <Section title="Price Information" icon={Calculator} color="blue">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Entry Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="any"
                name="entryPrice"
                required
                placeholder="0.00"
                value={formData.entryPrice}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Stop Loss
              </label>
              <input
                type="number"
                step="any"
                name="stopLoss"
                placeholder="0.00"
                value={formData.stopLoss}
                onChange={handleChange}
                className="w-full rounded-xl border border-red-500/30 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Take Profit
              </label>
              <input
                type="number"
                step="any"
                name="takeProfit"
                placeholder="0.00"
                value={formData.takeProfit}
                onChange={handleChange}
                className="w-full rounded-xl border border-emerald-500/30 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Exit Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="any"
                name="exitPrice"
                required
                placeholder="0.00"
                value={formData.exitPrice}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition font-mono"
              />
            </div>
          </div>

          {/* Auto-calculated R-Multiple Preview */}
          {formData.entryPrice && formData.stopLoss && formData.exitPrice && (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator size={14} className="text-blue-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Auto-Calculated R-Multiple
                  </span>
                </div>
                <span
                  className={`text-lg font-bold font-mono ${
                    rValue >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {rValue >= 0 ? "+" : ""}
                  {formData.resultR}R
                </span>
              </div>
            </div>
          )}
        </Section>

        {/* Section 3: Position Sizing */}
        <Section
          title="Position Sizing & Risk"
          icon={Zap}
          color="amber"
          defaultOpen={false}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Account Balance ($)
              </label>
              <input
                type="number"
                step="any"
                name="accountBalance"
                placeholder="e.g. 10000"
                value={formData.accountBalance}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-amber-500/50 focus:outline-none transition font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Risk %
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  name="riskPercent"
                  placeholder="e.g. 1.0"
                  value={formData.riskPercent}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pr-8 text-sm text-white placeholder-slate-600 focus:border-amber-500/50 focus:outline-none transition font-mono"
                />
                <Percent
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Position Size
              </label>
              <input
                type="number"
                step="any"
                name="positionSize"
                placeholder="e.g. 0.1"
                value={formData.positionSize}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-amber-500/50 focus:outline-none transition font-mono"
              />
            </div>
          </div>

          {/* Risk Amount Display */}
          {formData.riskAmount && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Risk Amount
                </span>
              </div>
              <span className="text-lg font-bold font-mono text-amber-400">
                ${formData.riskAmount}
              </span>
            </div>
          )}

          {/* Risk Warning */}
          {formData.riskPercent && parseFloat(formData.riskPercent) > 2 && (
            <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/5 p-3 flex items-start gap-2">
              <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-400">
                Warning: Risking more than 2% per trade increases your chances
                of significant drawdown.
              </p>
            </div>
          )}
        </Section>

        {/* Section 4: Performance */}
        <Section title="Performance" icon={TrendingUp} color="emerald">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Net P&L ($) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="any"
                name="pnl"
                required
                placeholder="e.g. 150 or -45"
                value={formData.pnl}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition font-mono ${
                  formData.pnl && isProfit
                    ? "border-emerald-500/30 focus:border-emerald-500/50"
                    : formData.pnl
                    ? "border-red-500/30 focus:border-red-500/50"
                    : "border-slate-800 focus:border-emerald-500/50"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                R-Multiple (Auto)
              </label>
              <input
                type="number"
                step="any"
                name="resultR"
                value={formData.resultR}
                onChange={handleChange}
                placeholder="—"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none transition font-mono"
              />
            </div>
          </div>

          {/* P&L Preview */}
          {formData.pnl && (
            <div
              className={`mt-4 flex items-center justify-between rounded-xl border p-4 ${
                isProfit
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-red-500/20 bg-red-500/5"
              }`}
            >
              <div className="flex items-center gap-2">
                {isProfit ? (
                  <TrendingUp size={14} className="text-emerald-400" />
                ) : (
                  <TrendingDown size={14} className="text-red-400" />
                )}
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isProfit ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isProfit ? "Profit" : "Loss"}
                </span>
              </div>
              <span
                className={`text-lg font-bold font-mono ${
                  isProfit ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isProfit ? "+" : "-"}$
                {Math.abs(pnlValue).toFixed(2)}
              </span>
            </div>
          )}
        </Section>

        {/* Section 5: Trade Context */}
        <Section
          title="Trade Context & Strategy"
          icon={Brain}
          color="purple"
          defaultOpen={false}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Setup
              </label>
              <select
                name="setup"
                value={formData.setup}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-purple-500/50 focus:outline-none cursor-pointer"
              >
                <option value="">Select setup...</option>
                {SETUPS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Market Structure
              </label>
              <input
                type="text"
                name="marketStructure"
                placeholder="e.g. Bullish, Range, Breakout"
                value={formData.marketStructure}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-purple-500/50 focus:outline-none transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Reason for Entry
              </label>
              <textarea
                name="entryReason"
                rows={2}
                placeholder="Why did you take this trade? What was your analysis?"
                value={formData.entryReason}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white placeholder-slate-600 focus:border-purple-500/50 focus:outline-none transition resize-none"
              />
            </div>
          </div>
        </Section>

        {/* Section 6: Psychology */}
        <Section
          title="Psychology & Discipline"
          icon={Brain}
          color="rose"
          defaultOpen={false}
        >
          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Emotion
              </label>
              <select
                name="emotion"
                value={formData.emotion}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-rose-500/50 focus:outline-none cursor-pointer"
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
                Emotional Intensity
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, emotionalIntensity: level })
                    }
                    className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
                      formData.emotionalIntensity === level
                        ? level <= 2
                          ? "bg-emerald-500 text-slate-950"
                          : level === 3
                          ? "bg-amber-500 text-slate-950"
                          : "bg-red-500 text-white"
                        : "border border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { key: "rulesFollowed", label: "Followed my rules" },
              { key: "planFollowed", label: "Followed trading plan" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
                  (formData as any)[key]
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-slate-800 bg-slate-950 hover:border-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  name={key}
                  checked={(formData as any)[key]}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-300">{label}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* Section 7: Media & Notes */}
        <Section title="Screenshot & Notes" icon={ImageIcon} color="blue">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              Chart Screenshot (Optional)
            </label>
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950 p-6 text-center hover:border-blue-500/30 transition">
              {imagePreview ? (
                <div className="relative mb-3 w-full max-h-64 overflow-hidden rounded-lg border border-slate-700">
                  <img
                    src={imagePreview}
                    alt="Chart preview"
                    className="w-full h-56 object-contain bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                    className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-red-600 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={28} className="mb-2 text-slate-600" />
                  <p className="text-xs text-slate-500 mb-3">
                    Click to upload or drag and drop your chart
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Execution Notes
            </label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Reflect on your mindset, execution mistakes, or setup pattern..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition resize-none"
            />
          </div>
        </Section>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Link
            href="/journal"
            className="rounded-xl border border-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Entry
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}