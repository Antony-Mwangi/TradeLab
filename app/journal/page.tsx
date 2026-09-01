"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  Filter,
  LineChart,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  X,
  Trash2,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface JournalEntry {
  _id: string;
  asset: string;
  assetType: string;
  tradeType: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  notes?: string;
  createdAt: string;
}

export default function JournalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAsset, setFilterAsset] = useState("all");
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loadingJournals, setLoadingJournals] = useState(true);

  const fetchJournals = useCallback(async () => {
    try {
      setLoadingJournals(true);
      const res = await fetch(`/api/journal?search=${encodeURIComponent(searchQuery)}&assetType=${filterAsset}`);
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
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchJournals();
    }
  }, [status, fetchJournals]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading your journal...</div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const userName = session.user?.name || "Trader";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
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
            className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"
          >
            <BookOpen size={19} />
            Trading Journal
          </a>

          <a
            href="/analytics"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <LineChart size={19} />
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
        </nav>

        <div className="border-t border-slate-800 p-4">
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

      {/* Main Content Area */}
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
          {/* Header section */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-emerald-400">
                Logbook & Record
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trading Journal
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Track your active setups, past executions, and lessons learned. Click any row to view full details.
              </p>
            </div>

            <a
              href="/journal/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <Plus size={18} />
              New Trade Entry
            </a>
          </div>

          {/* Filters & Search Row */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-400">
                <Filter size={16} />
                <span className="text-xs">Asset Type:</span>
                <select
                  value={filterAsset}
                  onChange={(e) => setFilterAsset(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">All Assets</option>
                  <option value="forex" className="bg-slate-900">Forex</option>
                  <option value="crypto" className="bg-slate-900">Crypto</option>
                  <option value="stocks" className="bg-slate-900">Stocks</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Table Structure */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase text-slate-300">
                  <tr>
                    <th scope="col" className="px-6 py-4">Date</th>
                    <th scope="col" className="px-6 py-4">Asset</th>
                    <th scope="col" className="px-6 py-4">Type</th>
                    <th scope="col" className="px-6 py-4">Entry</th>
                    <th scope="col" className="px-6 py-4">Exit</th>
                    <th scope="col" className="px-6 py-4">P&L</th>
                    <th scope="col" className="px-6 py-4 text-right">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingJournals ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                        Loading your journal logs...
                      </td>
                    </tr>
                  ) : journals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center">
                        <div className="mx-auto max-w-sm">
                          <BookOpen size={32} className="mx-auto mb-3 text-slate-600" />
                          <p className="font-medium text-slate-300">No journal entries found</p>
                          <p className="mt-1 text-xs text-slate-500">
                            You haven't logged any trades yet, or none match your current search parameters.
                          </p>
                          <a
                            href="/journal/new"
                            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                          >
                            <Plus size={14} />
                            Add First Trade
                          </a>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    journals.map((item) => (
                      <tr
                        key={item._id}
                        onClick={() => router.push(`/journal/${item._id}`)}
                        className="border-b border-slate-800/60 hover:bg-slate-900/60 cursor-pointer transition"
                      >
                        <td className="px-6 py-4 text-slate-300">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">
                          {item.asset}
                          <span className="block text-[10px] text-slate-500 uppercase tracking-wide">
                            {item.assetType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              item.tradeType === "BUY"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {item.tradeType}
                          </span>
                        </td>
                        <td className="px-6 py-4">${item.entryPrice}</td>
                        <td className="px-6 py-4">${item.exitPrice}</td>
                        <td className={`px-6 py-4 font-semibold ${item.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-slate-500 italic truncate max-w-[120px] block ml-auto">
                            {item.notes || "No notes"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}