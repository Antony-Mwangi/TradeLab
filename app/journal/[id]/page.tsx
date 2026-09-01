// src/app/journal/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  LineChart,
  LogOut,
  Menu,
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
  imageUrl?: string; // <--- Added imageUrl property here
  createdAt: string;
}

export default function TradeDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trade, setTrade] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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
      const res = await fetch(`/api/journal/${id}`, {
        method: "DELETE",
      });
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

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading trade details...</div>
      </main>
    );
  }

  if (!session || !trade) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <p className="text-slate-400 text-sm mb-4">Trade entry not found.</p>
        <button
          onClick={() => router.push("/journal")}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
        >
          Return to Journal
        </button>
      </main>
    );
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
          <a href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <BarChart3 size={19} /> Dashboard
          </a>
          <a href="/journal" className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
            <BookOpen size={19} /> Trading Journal
          </a>
          <a href="/analytics" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <LineChart size={19} /> Analytics
          </a>
          <a href="/backtesting" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <TrendingUp size={19} /> Backtesting
          </a>
          <a href="/psychology" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <Brain size={19} /> Trading Psychology
          </a>
          <a href="/trading-plan" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <Target size={19} /> Trading Plan
          </a>
          <a href="/calendar" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <CalendarDays size={19} /> Trading Calendar
          </a>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <a href="/settings" className="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <Settings size={19} /> Settings
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} /> Sign out
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
                <img src={session.user.image} alt={userName} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-semibold text-emerald-400">{userName.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => router.push("/journal")}
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={16} /> Back to Journal
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 size={14} /> {deleting ? "Deleting..." : "Delete Trade"}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold uppercase bg-slate-800 text-slate-300 mb-2">
                  {trade.assetType}
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {trade.asset}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Logged on {new Date(trade.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                    trade.tradeType === "BUY"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {trade.tradeType}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-3 border-b border-slate-800">
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Entry Price</p>
                <p className="text-lg font-semibold text-white mt-1">${trade.entryPrice}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Exit Price</p>
                <p className="text-lg font-semibold text-white mt-1">${trade.exitPrice}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Net P&L</p>
                <p className={`text-lg font-semibold mt-1 ${trade.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {trade.pnl >= 0 ? `+$${trade.pnl}` : `-$${Math.abs(trade.pnl)}`}
                </p>
              </div>
            </div>

            {/* Chart Screenshot Section */}
            {trade.imageUrl && (
              <div className="py-6 border-b border-slate-800">
                <h3 className="text-sm font-medium text-slate-300 mb-3">Chart Screenshot</h3>
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2">
                  <img
                    src={trade.imageUrl}
                    alt={`${trade.asset} Chart Screenshot`}
                    className="w-full h-auto rounded-lg object-contain max-h-[500px]"
                  />
                </div>
              </div>
            )}

            <div className="pt-6">
              <h3 className="text-sm font-medium text-slate-300 mb-2">Trade Notes & Observations</h3>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 text-sm text-slate-400 min-h-[100px] whitespace-pre-wrap">
                {trade.notes || "No detailed notes provided for this execution."}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}