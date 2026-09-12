// app/calendar/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  CalendarDays,
  Plus,
  Trash2,
  Edit3,
  FileText,
  ExternalLink,
  RefreshCw,
  Globe,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Info,
  Activity,
  BookOpen,
  X,
} from "lucide-react";

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"live" | "custom">("custom");

  // Custom User News Items
  const [customNews, setCustomNews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterImpact, setFilterImpact] = useState<"all" | "High" | "Medium" | "Low">("all");

  // Form state for custom news
  const [formData, setFormData] = useState({
    title: "",
    currency: "USD",
    impact: "High" as "Low" | "Medium" | "High",
    date: new Date().toISOString().split("T")[0],
    time: "08:30",
    forecast: "",
    previous: "",
    actual: "",
    notes: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetchCustomNews();
    }
  }, [status]);

  const fetchCustomNews = () => {
    setLoading(true);
    fetch("/api/custom-news")
      .then((res) => res.json())
      .then((data) => {
        if (data.newsItems) setCustomNews(data.newsItems);
      })
      .catch((err) => console.error("Failed to load custom news", err))
      .finally(() => setLoading(false));
  };

  const handleSaveCustomNews = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a news event title.");
      return;
    }
    setSaving(true);
    try {
      const payload = editingId ? { ...formData, _id: editingId } : formData;
      const res = await fetch("/api/custom-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        resetForm();
        fetchCustomNews();
      } else {
        alert("Failed to save custom news item");
      }
    } catch (err) {
      console.error("Error saving custom news:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      currency: item.currency,
      impact: item.impact,
      date: item.date,
      time: item.time,
      forecast: item.forecast || "",
      previous: item.previous || "",
      actual: item.actual || "",
      notes: item.notes || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this custom news entry?"))
      return;
    try {
      const res = await fetch(`/api/custom-news/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCustomNews(customNews.filter((n) => n._id !== id));
      }
    } catch (err) {
      console.error("Error deleting custom news:", err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      currency: "USD",
      impact: "High",
      date: new Date().toISOString().split("T")[0],
      time: "08:30",
      forecast: "",
      previous: "",
      actual: "",
      notes: "",
    });
  };

  // Filter custom news
  const filteredNews = customNews.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currency?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesImpact =
      filterImpact === "all" || item.impact === filterImpact;
    return matchesSearch && matchesImpact;
  });

  // Summary stats
  const highImpactCount = customNews.filter((n) => n.impact === "High").length;
  const upcomingCount = customNews.filter(
    (n) => new Date(`${n.date}T${n.time}`) >= new Date()
  ).length;

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">Loading calendar workspace...</p>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="h-4 w-4 text-emerald-400" />
          <p className="text-sm font-medium text-emerald-400">
            Events & Catalysts
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Economic & News Hub
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          Monitor live market events and organize your custom trading news.
        </p>
      </section>

      {/* Tab Switcher + Add Button */}
      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("custom")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                activeTab === "custom"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "bg-slate-950/50 border border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700"
              }`}
            >
              <FileText size={14} />
              My Custom News
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeTab === "custom"
                    ? "bg-slate-950/20 text-slate-950"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {customNews.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                activeTab === "live"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "bg-slate-950/50 border border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700"
              }`}
            >
              <Globe size={14} />
              Live Market Feed
              <span className="flex h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            </button>
          </div>

          {activeTab === "custom" && (
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Plus size={15} />
              Add News Event
            </button>
          )}
        </div>
      </section>

      {activeTab === "custom" ? (
        <>
          {/* Summary Stats */}
          {customNews.length > 0 && (
            <section className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/30 transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Events
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
                    <CalendarDays size={16} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">
                  {customNews.length}
                </p>
                <p className="text-xs text-slate-500 mt-1">Logged events</p>
              </div>

              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-red-500/30 transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    High Impact
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-transform group-hover:scale-110">
                    <AlertCircle size={16} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-red-400">
                  {highImpactCount}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Critical events to watch
                </p>
              </div>

              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-blue-500/30 transition-all hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Upcoming
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
                    <Clock size={16} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">
                  {upcomingCount}
                </p>
                <p className="text-xs text-slate-500 mt-1">Future events</p>
              </div>
            </section>
          )}

          {/* Search & Filter (only when news exists) */}
          {customNews.length > 0 && (
            <section className="mb-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="Search events, currencies, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-400">
                <Filter size={14} />
                <span className="text-xs">Impact:</span>
                <select
                  value={filterImpact}
                  onChange={(e) => setFilterImpact(e.target.value as any)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer text-xs font-medium"
                >
                  <option value="all" className="bg-slate-900">
                    All Impacts
                  </option>
                  <option value="High" className="bg-slate-900">
                    🔴 High
                  </option>
                  <option value="Medium" className="bg-slate-900">
                    🟡 Medium
                  </option>
                  <option value="Low" className="bg-slate-900">
                    🟢 Low
                  </option>
                </select>
              </div>
            </section>
          )}

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-400/30 border-t-emerald-400" />
              <p className="text-xs text-slate-400">
                Loading custom trading news...
              </p>
            </div>
          ) : customNews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <CalendarDays size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No Custom News Yet
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                Key in the date, forecast, previous, impact, currency, and
                custom notes for upcoming news you are trading.
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105"
              >
                <Plus size={16} />
                Add Your First News Event
              </button>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center">
              <Search size={32} className="mx-auto mb-3 text-slate-600" />
              <h3 className="text-base font-semibold text-white mb-1">
                No events match your filters
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Try adjusting your search or impact filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterImpact("all");
                }}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNews.map((item) => {
                const impactStyles = {
                  High: {
                    bg: "bg-red-500/10",
                    text: "text-red-400",
                    border: "border-red-500/30",
                    dot: "bg-red-500",
                  },
                  Medium: {
                    bg: "bg-amber-500/10",
                    text: "text-amber-400",
                    border: "border-amber-500/30",
                    dot: "bg-amber-500",
                  },
                  Low: {
                    bg: "bg-blue-500/10",
                    text: "text-blue-400",
                    border: "border-blue-500/30",
                    dot: "bg-blue-500",
                  },
                }[item.impact as "High" | "Medium" | "Low"] || {
                  bg: "bg-slate-500/10",
                  text: "text-slate-400",
                  border: "border-slate-500/30",
                  dot: "bg-slate-500",
                };

                return (
                  <div
                    key={item._id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 hover:border-slate-700 hover:bg-slate-900/60 transition-all"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* Left: Event Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-white px-2 py-0.5 rounded bg-slate-800">
                            {item.currency}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${impactStyles.bg} ${impactStyles.text} ${impactStyles.border}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${impactStyles.dot}`}
                            />
                            {item.impact} Impact
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                            <Clock size={11} />
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            @ {item.time}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white mb-1">
                          {item.title}
                        </h3>

                        {item.notes && (
                          <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950 p-3 flex items-start gap-2">
                            <FileText
                              size={13}
                              className="text-emerald-400 shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-slate-300 leading-relaxed">
                              <span className="font-semibold text-slate-400">
                                Notes:{" "}
                              </span>
                              {item.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right: Metrics + Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-5">
                          <div className="text-center">
                            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                              Previous
                            </p>
                            <p className="text-sm font-mono text-slate-300">
                              {item.previous || "—"}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                              Forecast
                            </p>
                            <p className="text-sm font-mono text-slate-300">
                              {item.forecast || "—"}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1">
                              Actual
                            </p>
                            <p className="text-sm font-mono font-bold text-white">
                              {item.actual || "—"}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 sm:border-l sm:border-slate-800 sm:pl-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded-xl p-2 bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700 transition"
                            title="Edit"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded-xl p-2 bg-slate-950 border border-slate-800 text-slate-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* ===== LIVE MARKET FEED (Forex Factory Embed) ===== */
        <div className="space-y-5">
          {/* Header Card */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-950/40 via-slate-900/40 to-slate-950/40 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Globe className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 flex-wrap">
                    Forex Factory Live Calendar
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-xl">
                    Real-time economic calendar with high, medium, and low
                    impact events sourced directly from Forex Factory.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const iframe = document.getElementById(
                      "ff-calendar"
                    ) as HTMLIFrameElement;
                    if (iframe) iframe.src = iframe.src;
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:border-slate-700 transition"
                >
                  <RefreshCw size={13} />
                  Refresh
                </button>
                <a
                  href="https://www.forexfactory.com/calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105"
                >
                  <ExternalLink size={13} />
                  Open Full Calendar
                </a>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-start gap-3">
            <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-300/90">
              <p className="font-semibold text-blue-400 mb-1">
                Live Feed Integration
              </p>
              <p className="leading-relaxed">
                This calendar is embedded directly from Forex Factory. All
                times are displayed in your local timezone. Use the filters
                and navigation inside the calendar to view specific dates,
                currencies, and impact levels.
              </p>
            </div>
          </div>

          {/* Impact Legend */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-400">
                  Impact Legend
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-[10px] text-slate-400 font-medium">
                    High Impact
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] text-slate-400 font-medium">
                    Medium Impact
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-slate-400 font-medium">
                    Low Impact
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Forex Factory Calendar Embed */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-slate-400" />
                <span className="text-xs text-slate-400">
                  Forex Factory — Economic Calendar
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Streaming live
              </div>
            </div>
            <div className="relative w-full bg-white" style={{ height: "800px" }}>
              <iframe
                id="ff-calendar"
                src="https://www.forexfactory.com/calendar?month=this"
                title="Forex Factory Economic Calendar"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </div>

          {/* Fallback / Alternative Access */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertCircle size={16} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white mb-1">
                  Calendar not displaying?
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Some browsers or ad blockers may block embedded iframes.
                  You can access the full calendar directly on Forex Factory.
                </p>
                <a
                  href="https://www.forexfactory.com/calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 transition"
                >
                  <ExternalLink size={13} />
                  Open Forex Factory Calendar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Modal: Create/Edit Custom News ===== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 backdrop-blur px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CalendarDays size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingId ? "Edit News Event" : "Add News Event"}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Log an upcoming or past economic event
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Event Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. US Non-Farm Payrolls"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                  >
                    {["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Impact Level
                  </label>
                  <select
                    value={formData.impact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        impact: e.target.value as any,
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                  >
                    <option value="High">🔴 High Impact</option>
                    <option value="Medium">🟡 Medium Impact</option>
                    <option value="Low">🟢 Low Impact</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              {/* Metrics Section */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Data Values
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-[10px] font-medium text-slate-500 block mb-1.5 uppercase">
                      Previous
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 165K"
                      value={formData.previous}
                      onChange={(e) =>
                        setFormData({ ...formData, previous: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-medium text-slate-500 block mb-1.5 uppercase">
                      Forecast
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 180K"
                      value={formData.forecast}
                      onChange={(e) =>
                        setFormData({ ...formData, forecast: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-medium text-emerald-400 block mb-1.5 uppercase font-bold">
                      Actual (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 142K"
                      value={formData.actual}
                      onChange={(e) =>
                        setFormData({ ...formData, actual: e.target.value })
                      }
                      className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                  Trading Notes & Game Plan
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Wait for initial spike rejection, look for 15-minute sweep..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustomNews}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition hover:scale-105 active:scale-95"
                >
                  {saving ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CalendarDays size={13} />
                      {editingId ? "Update Event" : "Save Event"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}