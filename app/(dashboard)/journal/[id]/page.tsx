// app/journal/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Zap,
  Shield,
  Brain,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Award,
  Calculator,
  Percent,
  DollarSign,
  Activity,
  Image as ImageIcon,
  X,
  Calendar,
  Flame,
  Snowflake,
  FileText,
  Ban,
} from "lucide-react";

interface JournalEntry {
  _id: string;
  asset: string;
  assetType: string;
  tradeType: string;
  entryPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  exitPrice: number;
  positionSize?: number;
  riskPercent?: number;
  riskAmount?: number;
  accountBalance?: number;
  pnl: number;
  resultR?: number;
  pipsCaptured?: number;
  setup?: string;
  strategy?: string;
  session?: string;
  marketStructure?: string;
  confluence?: string;
  entryReason?: string;
  tradeDuration?: string;
  emotion?: string;
  emotionalIntensity?: number;
  rulesFollowed?: boolean;
  riskRespected?: boolean;
  stopRespected?: boolean;
  planFollowed?: boolean;
  isFomo?: boolean;
  isRevenge?: boolean;
  mistakes?: string[];
  lessonsLearned?: string;
  notes?: string;
  beforeEntryImageUrl?: string;
  afterExitImageUrl?: string;
  imageUrl?: string;
  entryDate?: string;
  exitDate?: string;
  createdAt: string;
}

// ===== Reusable stat block =====
function StatBlock({
  label,
  value,
  icon: Icon,
  color = "emerald",
  mono = true,
}: {
  label: string;
  value: string | number;
  icon: any;
  color?: "emerald" | "blue" | "amber" | "purple" | "rose" | "slate";
  mono?: boolean;
}) {
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    blue: "bg-blue-500/10 text-blue-400",
    amber: "bg-amber-500/10 text-amber-400",
    purple: "bg-purple-500/10 text-purple-400",
    rose: "bg-rose-500/10 text-rose-400",
    slate: "bg-slate-500/10 text-slate-400",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${colorMap[color]}`}
        >
          <Icon size={13} />
        </div>
      </div>
      <p
        className={`text-lg font-bold text-white ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

export default function TradeDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [trade, setTrade] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeImage, setActiveImage] = useState<"before" | "after" | null>(
    null
  );

  useEffect(() => {
    if (status === "authenticated" && id) {
      fetch(`/api/journal/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.journal) {
            setTrade(data.journal);
          }
        })
        .catch((err) => console.error("Failed to fetch trade details", err))
        .finally(() => setLoading(false));
    }
  }, [status, id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this trade record?")) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/journal/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/journal");
      } else {
        alert("Failed to delete the trade entry.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const sessionLabels: Record<string, string> = {
    london: "London",
    new_york: "New York",
    asian: "Asian",
    sydney: "Sydney",
    other: "Other",
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">Loading trade details...</p>
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700">
          <FileText size={28} className="text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Trade entry not found
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          This trade may have been deleted or doesn't exist.
        </p>
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
        >
          <ArrowLeft size={14} />
          Return to Journal
        </Link>
      </div>
    );
  }

  const isProfit = trade.pnl >= 0;
  const hasImages =
    trade.beforeEntryImageUrl ||
    trade.afterExitImageUrl ||
    trade.imageUrl;

  return (
    <>
      {/* Header Actions */}
      <section className="mb-6 flex items-center justify-between">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Journal
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
        >
          <Trash2 size={13} />
          {deleting ? "Deleting..." : "Delete Trade"}
        </button>
      </section>

      {/* ===== Trade Header Card ===== */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6 sm:p-8 mb-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start border-b border-slate-800 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                {trade.assetType}
              </span>
              {trade.session && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Clock size={10} />
                  {sessionLabels[trade.session] || trade.session}
                </span>
              )}
              {trade.setup && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Target size={10} />
                  {trade.setup}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {trade.asset}
            </h1>

            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
              <Calendar size={11} />
              Logged on{" "}
              {new Date(trade.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3">
            {/* Trade Direction Badge */}
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                trade.tradeType === "BUY"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
            >
              {trade.tradeType === "BUY" ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {trade.tradeType}
            </span>

            {/* P&L Display */}
            <div className="text-right">
              <p
                className={`text-3xl font-bold font-mono ${
                  isProfit ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isProfit ? "+" : "-"}$
                {Math.abs(trade.pnl).toFixed(2)}
              </p>
              {trade.resultR !== undefined && trade.resultR !== 0 && (
                <span
                  className={`inline-block mt-1 text-sm font-semibold ${
                    trade.resultR >= 0
                      ? "text-emerald-400/70"
                      : "text-red-400/70"
                  }`}
                >
                  {trade.resultR >= 0 ? "+" : ""}
                  {trade.resultR}R
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Price Information Grid */}
        <div className="grid grid-cols-2 gap-3 py-6 sm:grid-cols-4">
          <StatBlock
            label="Entry Price"
            value={`$${trade.entryPrice}`}
            icon={Target}
            color="emerald"
          />
          {trade.stopLoss && (
            <StatBlock
              label="Stop Loss"
              value={`$${trade.stopLoss}`}
              icon={Shield}
              color="rose"
            />
          )}
          {trade.takeProfit && (
            <StatBlock
              label="Take Profit"
              value={`$${trade.takeProfit}`}
              icon={Award}
              color="emerald"
            />
          )}
          <StatBlock
            label="Exit Price"
            value={`$${trade.exitPrice}`}
            icon={TrendingUp}
            color="blue"
          />
        </div>
      </section>

      {/* ===== Risk & Position Sizing ===== */}
      {(trade.positionSize ||
        trade.riskPercent ||
        trade.riskAmount ||
        trade.accountBalance ||
        trade.pipsCaptured) && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Position Sizing & Risk
              </h2>
              <p className="text-xs text-slate-500">
                How much was at risk and how the position was sized
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trade.positionSize && (
              <StatBlock
                label="Position Size"
                value={trade.positionSize}
                icon={Calculator}
                color="blue"
              />
            )}
            {trade.riskPercent && (
              <StatBlock
                label="Risk %"
                value={`${trade.riskPercent}%`}
                icon={Percent}
                color={trade.riskPercent > 2 ? "rose" : "emerald"}
              />
            )}
            {trade.riskAmount && (
              <StatBlock
                label="Risk Amount"
                value={`$${trade.riskAmount}`}
                icon={DollarSign}
                color="amber"
              />
            )}
            {trade.accountBalance && (
              <StatBlock
                label="Account Balance"
                value={`$${trade.accountBalance}`}
                icon={Activity}
                color="emerald"
              />
            )}
          </div>

          {/* Risk Warning */}
          {trade.riskPercent && trade.riskPercent > 2 && (
            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 flex items-start gap-2">
              <AlertCircle
                size={14}
                className="text-amber-400 shrink-0 mt-0.5"
              />
              <p className="text-xs text-amber-400">
                This trade exceeded the recommended 2% risk per trade.
              </p>
            </div>
          )}
        </section>
      )}

      {/* ===== Trade Context ===== */}
      {(trade.strategy ||
        trade.marketStructure ||
        trade.confluence ||
        trade.entryReason ||
        trade.tradeDuration) && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Target size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Trade Context
              </h2>
              <p className="text-xs text-slate-500">
                Setup, strategy, and market conditions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
            {trade.strategy && (
              <StatBlock
                label="Strategy"
                value={trade.strategy}
                icon={TrendingUp}
                color="purple"
                mono={false}
              />
            )}
            {trade.marketStructure && (
              <StatBlock
                label="Market Structure"
                value={trade.marketStructure}
                icon={Activity}
                color="blue"
                mono={false}
              />
            )}
            {trade.confluence && (
              <StatBlock
                label="Confluence"
                value={trade.confluence}
                icon={Target}
                color="emerald"
                mono={false}
              />
            )}
            {trade.tradeDuration && (
              <StatBlock
                label="Duration"
                value={trade.tradeDuration}
                icon={Clock}
                color="amber"
                mono={false}
              />
            )}
          </div>

          {trade.entryReason && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Reason for Entry
              </p>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {trade.entryReason}
              </p>
            </div>
          )}
        </section>
      )}

      {/* ===== Psychology & Discipline ===== */}
      {(trade.emotion ||
        trade.rulesFollowed !== undefined ||
        trade.planFollowed !== undefined ||
        trade.isFomo ||
        trade.isRevenge ||
        (trade.mistakes && trade.mistakes.length > 0) ||
        trade.lessonsLearned) && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Brain size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Psychology & Discipline
              </h2>
              <p className="text-xs text-slate-500">
                Emotional state and rule adherence
              </p>
            </div>
          </div>

          {/* Emotion */}
          {trade.emotion && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Emotion During Trade
                </p>
                <span className="text-sm font-semibold text-white">
                  {trade.emotion}
                </span>
              </div>
              {trade.emotionalIntensity && (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full ${
                        level <= trade.emotionalIntensity!
                          ? level <= 2
                            ? "bg-emerald-400"
                            : level === 3
                            ? "bg-amber-400"
                            : "bg-red-400"
                          : "bg-slate-800"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Discipline Checks */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
            {[
              { key: "rulesFollowed", label: "Rules Followed" },
              { key: "riskRespected", label: "Risk Respected" },
              { key: "stopRespected", label: "Stop Respected" },
              { key: "planFollowed", label: "Plan Followed" },
            ].map(({ key, label }) => {
              const value = (trade as any)[key];
              if (value === undefined) return null;
              return (
                <div
                  key={key}
                  className={`flex items-center gap-2 rounded-xl border p-3 ${
                    value
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  {value ? (
                    <CheckCircle2
                      size={14}
                      className="text-emerald-400 shrink-0"
                    />
                  ) : (
                    <XCircle size={14} className="text-red-400 shrink-0" />
                  )}
                  <span className="text-xs text-slate-300 font-medium">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Negative Behaviors */}
          {(trade.isFomo || trade.isRevenge) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {trade.isFomo && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400">
                  <AlertCircle size={12} />
                  FOMO Entry
                </span>
              )}
              {trade.isRevenge && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400">
                  <AlertCircle size={12} />
                  Revenge Trading
                </span>
              )}
            </div>
          )}

          {/* Mistakes */}
          {trade.mistakes && trade.mistakes.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Mistakes Made
              </p>
              <div className="flex flex-wrap gap-2">
                {trade.mistakes.map((mistake, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 text-xs text-red-400"
                  >
                    {mistake}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Learned */}
          {trade.lessonsLearned && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award size={13} className="text-amber-400" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  Lessons Learned
                </p>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {trade.lessonsLearned}
              </p>
            </div>
          )}
        </section>
      )}

      {/* ===== Screenshots ===== */}
      {hasImages && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ImageIcon size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Chart Screenshots
              </h2>
              <p className="text-xs text-slate-500">
                Click any image to view full size
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(trade.beforeEntryImageUrl || trade.imageUrl) && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Before Entry
                </p>
                <button
                  type="button"
                  onClick={() => setActiveImage("before")}
                  className="group relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-emerald-500/30 transition"
                >
                  <img
                    src={trade.beforeEntryImageUrl || trade.imageUrl}
                    alt="Before entry chart"
                    className="w-full h-56 object-contain transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </button>
              </div>
            )}

            {trade.afterExitImageUrl && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  After Exit
                </p>
                <button
                  type="button"
                  onClick={() => setActiveImage("after")}
                  className="group relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-emerald-500/30 transition"
                >
                  <img
                    src={trade.afterExitImageUrl}
                    alt="After exit chart"
                    className="w-full h-56 object-contain transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== Notes ===== */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-500/10 text-slate-300 border border-slate-700">
            <FileText size={16} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              Execution Notes
            </h2>
            <p className="text-xs text-slate-500">
              Observations and reflections on this trade
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap min-h-[100px]">
          {trade.notes || (
            <span className="text-slate-500 italic">
              No detailed notes provided for this execution.
            </span>
          )}
        </div>
      </section>

      {/* ===== Image Lightbox Modal ===== */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 rounded-full bg-slate-900/90 p-2 text-white hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img
            src={
              activeImage === "before"
                ? trade.beforeEntryImageUrl || trade.imageUrl
                : trade.afterExitImageUrl
            }
            alt="Chart screenshot"
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}