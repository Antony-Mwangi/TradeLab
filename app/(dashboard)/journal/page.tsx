// app/journal/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Filter,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Percent,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface JournalEntry {
  _id: string;
  asset: string;
  assetType: string;
  tradeType: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  resultR?: number;
  setup?: string;
  session?: string;
  emotion?: string;
  notes?: string;
  createdAt: string;
}

export default function JournalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterAsset, setFilterAsset] = useState("all");
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loadingJournals, setLoadingJournals] = useState(true);

  const fetchJournals = useCallback(async () => {
    try {
      setLoadingJournals(true);
      const res = await fetch(
        `/api/journal?search=${encodeURIComponent(searchQuery)}&assetType=${filterAsset}`
      );
      const data = await res.json();
      if (res.ok) {
        setJournals(data.journals);
      }
    } catch (err) {
      console.error("Failed to load journals", err);
    } finally {
      setLoadingJournals(false);
    }
  }, [searchQuery, filterAsset]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchJournals();
    }
  }, [status, fetchJournals]);

  // Calculate summary stats
  const totalTrades = journals.length;
  const totalPnl = journals.reduce((sum, j) => sum + (j.pnl || 0), 0);
  const winningTrades = journals.filter((j) => j.pnl > 0).length;
  const losingTrades = journals.filter((j) => j.pnl < 0).length;
  const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(1) : "0.0";

  return (
    <>
      {/* Page Header */}
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <p className="text-sm font-medium text-emerald-400">
              Logbook & Record
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trading Journal
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Track your active setups, past executions, and lessons learned. Click any row to view full details.
          </p>
        </div>

        <a
          href="/journal/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          New Trade Entry
        </a>
      </section>

      {/* Summary Stats */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Trades */}
        <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/30 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Trades
            </p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
              <BookOpen size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{totalTrades}</p>
          <p className="text-xs text-slate-500 mt-1">All time</p>
        </div>

        {/* Total P&L */}
        <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/30 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total P&L
            </p>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                totalPnl >= 0
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              <DollarSign size={16} />
            </div>
          </div>
          <p
            className={`text-2xl font-bold ${
              totalPnl >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {totalPnl >= 0 ? "+" : "-"}${Math.abs(totalPnl).toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Net profit/loss</p>
        </div>

        {/* Win Rate */}
        <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-blue-500/30 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Win Rate
            </p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
              <Percent size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{winRate}%</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${winRate}%` }}
            />
          </div>
        </div>

        {/* Winning/Losing */}
        <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-purple-500/30 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Wins / Losses
            </p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">
              {winningTrades}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-2xl font-bold text-red-400">
              {losingTrades}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Winning vs losing</p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search trades by asset, setup, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-400">
            <Filter size={16} />
            <span className="text-xs">Asset:</span>
            <select
              value={filterAsset}
              onChange={(e) => setFilterAsset(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-medium"
            >
              <option value="all" className="bg-slate-900">All Assets</option>
              <option value="forex" className="bg-slate-900">Forex</option>
              <option value="crypto" className="bg-slate-900">Crypto</option>
              <option value="stocks" className="bg-slate-900">Stocks</option>
            </select>
          </div>
        </div>
      </section>

      {/* Trades Table */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase text-slate-300">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Asset
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Type
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Entry
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Exit
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  P&L
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {loadingJournals ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-400/30 border-t-emerald-400" />
                      <p className="text-sm">Loading your journal logs...</p>
                    </div>
                  </td>
                </tr>
              ) : journals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="mx-auto max-w-sm">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700">
                        <BookOpen size={28} className="text-slate-500" />
                      </div>
                      <p className="text-base font-semibold text-white">
                        No journal entries found
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        You haven't logged any trades yet, or none match your
                        current search parameters.
                      </p>
                      <a
                        href="/journal/new"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:scale-105"
                      >
                        <Plus size={16} />
                        Add Your First Trade
                      </a>
                    </div>
                  </td>
                </tr>
              ) : (
                journals.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => router.push(`/journal/${item._id}`)}
                    className="border-b border-slate-800/60 hover:bg-slate-900/60 cursor-pointer transition group"
                  >
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-slate-500" />
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">
                        {item.asset}
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                        {item.assetType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          item.tradeType === "BUY"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {item.tradeType === "BUY" ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        {item.tradeType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-mono text-xs">
                      ${item.entryPrice}
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-mono text-xs">
                      ${item.exitPrice}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`font-bold font-mono ${
                          item.pnl >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.pnl >= 0 ? "+" : "-"}$
                        {Math.abs(item.pnl).toFixed(2)}
                      </div>
                      {item.resultR !== undefined && item.resultR !== 0 && (
                        <span
                          className={`text-[10px] font-semibold ${
                            item.resultR >= 0
                              ? "text-emerald-400/70"
                              : "text-red-400/70"
                          }`}
                        >
                          {item.resultR >= 0 ? "+" : ""}
                          {item.resultR}R
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye size={12} />
                        View
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {!loadingJournals && journals.length > 0 && (
          <div className="border-t border-slate-800 bg-slate-900/40 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-300">{journals.length}</strong>{" "}
              {journals.length === 1 ? "trade" : "trades"}
            </span>
            <span>Click any row to view details</span>
          </div>
        )}
      </section>
    </>
  );
}