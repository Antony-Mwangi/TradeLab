// src/app/calendar/page.tsx
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
  Radio,
  Plus,
  Trash2,
  Edit3,
  FileText,
} from "lucide-react";

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"live" | "custom">("custom");

  // System Live Events
  const [liveEvents, setLiveEvents] = useState<any[]>([]);

  // Custom User News Items
  const [customNews, setCustomNews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchLiveEvents();
      fetchCustomNews();
    }
  }, [status]);

  const fetchLiveEvents = () => {
    fetch("/api/calendar?range=today")
      .then((res) => res.json())
      .then((data) => {
        if (data.events) setLiveEvents(data.events);
      })
      .catch((err) => console.error("Failed to load live events", err));
  };

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
    if (!confirm("Are you sure you want to delete this custom news entry?")) return;
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

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading calendar workspace...</p>
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
          <a href="/trading-plan" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><Target size={19} /> Trading Plan</a>
          <a href="/calendar" className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"><CalendarDays size={19} /> Trading Calendar</a>
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
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
            >
              <Plus size={15} /> Add News Event
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Economic & News Hub</h1>
              <p className="text-xs text-slate-400 mt-1">Organize and monitor the specific macro news events you plan to trade.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("custom")}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  activeTab === "custom" ? "bg-emerald-500 text-slate-950" : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                My Custom News ({customNews.length})
              </button>
              <button
                onClick={() => setActiveTab("live")}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  activeTab === "live" ? "bg-emerald-500 text-slate-950" : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                Live Market Feed ({liveEvents.length})
              </button>
            </div>
          </div>

          {activeTab === "custom" ? (
            <div>
              {loading ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center">
                  <p className="text-xs text-slate-400">Loading custom trading news...</p>
                </div>
              ) : customNews.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center">
                  <CalendarDays size={36} className="mx-auto text-slate-600 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">No custom news logged yet</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">Key in the date, forecast, previous, impact, currency, and custom notes for upcoming news you are trading.</p>
                  <button
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(true);
                    }}
                    className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                  >
                    Add Your First News Event
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customNews.map((item) => (
                    <div key={item._id} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between hover:border-slate-700 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{item.currency}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.impact === "High" ? "bg-red-500/10 text-red-400 border border-red-500/20" : item.impact === "Medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          }`}>
                            {item.impact} Impact
                          </span>
                          <span className="text-xs font-mono text-slate-400">{item.date} @ {item.time}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        {item.notes && (
                          <p className="text-xs text-slate-300 bg-slate-950 border border-slate-800 p-3 rounded-xl mt-2 flex items-start gap-2">
                            <FileText size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong className="text-slate-400">Notes:</strong> {item.notes}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-6 border-t border-slate-800/80 pt-4 sm:border-t-0 sm:pt-0">
                        <div className="grid grid-cols-3 gap-6 text-center font-mono">
                          <div>
                            <p className="text-[10px] uppercase text-slate-500">Previous</p>
                            <p className="text-xs text-slate-300 mt-0.5">{item.previous || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-slate-500">Forecast</p>
                            <p className="text-xs text-slate-300 mt-0.5">{item.forecast || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-emerald-400 font-bold">Actual</p>
                            <p className="text-xs font-bold text-white mt-0.5">{item.actual || "—"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
                          <button onClick={() => handleEdit(item)} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-900" title="Edit">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 hover:text-red-400 hover:bg-slate-900" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {liveEvents.map((ev) => {
                const eventTime = new Date(ev.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                return (
                  <div key={ev.eventId} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-sm font-mono font-bold text-slate-300 w-16 pt-0.5">{eventTime}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{ev.currency}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                            {ev.importance} Impact
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">{ev.event}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{ev.country}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-center font-mono">
                      <div>
                        <p className="text-[10px] uppercase text-slate-500">Previous</p>
                        <p className="text-xs text-slate-300 mt-0.5">{ev.previous || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-500">Forecast</p>
                        <p className="text-xs text-slate-300 mt-0.5">{ev.forecast || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold">Actual</p>
                        <p className="text-xs font-bold text-white mt-0.5">{ev.actual || "—"}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal for Creating/Editing Custom News */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white">{editingId ? "Edit Custom News Event" : "Add Custom News Event"}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Event Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. US Non-Farm Payrolls"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                      <option value="AUD">AUD</option>
                      <option value="CAD">CAD</option>
                      <option value="CHF">CHF</option>
                      <option value="NZD">NZD</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Impact Level</label>
                    <select
                      value={formData.impact}
                      onChange={(e) => setFormData({ ...formData, impact: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="High">🔴 High Impact</option>
                      <option value="Medium">🟡 Medium Impact</option>
                      <option value="Low">🟢 Low Impact</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Previous</label>
                    <input
                      type="text"
                      placeholder="e.g. 165K"
                      value={formData.previous}
                      onChange={(e) => setFormData({ ...formData, previous: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Forecast</label>
                    <input
                      type="text"
                      placeholder="e.g. 180K"
                      value={formData.forecast}
                      onChange={(e) => setFormData({ ...formData, forecast: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Actual (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 142K"
                      value={formData.actual}
                      onChange={(e) => setFormData({ ...formData, actual: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Trading Notes & Game Plan</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Wait for initial spike rejection, look for 15-minute sweep..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCustomNews}
                    disabled={saving}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save News Event"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}