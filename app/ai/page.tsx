// src/app/ai/page.tsx
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
  Sparkles,
  Send,
  Bot,
  User,
} from "lucide-react";

export default function AIPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content: "Hello! I am your TradeLab AI Analyst. I have secure access to your journal, analytics, and trading plans. How can I help you review and improve your performance today?",
    },
  ]);

  const suggestedQuestions = [
    "Analyze my recent trading performance",
    "What are my biggest mistakes or rule violations?",
    "Am I following my trading plan consistently?",
    "Analyze my psychology and emotional triggers",
    "What should I focus on improving this week?",
  ];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || loading) return;

    const userMsg = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "I encountered an error analyzing your data. Please try again." }]);
      }
    } catch (err) {
      console.error("Error communicating with AI endpoint:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Network error connecting to TradeLab AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading TradeLab AI...</p>
      </main>
    );
  }

  const userName = session?.user?.name || "Trader";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
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
          <a href="/calendar" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><CalendarDays size={19} /> Trading Calendar</a>
          <a href="/ai" className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"><Sparkles size={19} /> TradeLab AI Analyst</a>
        </nav>
        <div className="border-t border-slate-800 p-4">
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"><LogOut size={19} /> Sign out</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72 flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-400 lg:hidden"><Menu size={22} /></button>
          <div className="flex items-center gap-2">
            <Sparkles className="text-emerald-400" size={20} />
            <h1 className="text-base font-bold text-white">TradeLab AI Analyst</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm font-medium">{userName}</span>
          </div>
        </header>

        <main className="mx-auto max-w-4xl w-full flex-1 px-4 py-8 flex flex-col justify-between">
          {/* Chat Stream */}
          <div className="space-y-6 mb-6 flex-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-emerald-500 text-slate-950" : "bg-slate-900 border border-slate-800 text-emerald-400"}`}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`rounded-2xl p-4 text-xs sm:text-sm max-w-[80%] leading-relaxed ${
                  msg.role === "user" ? "bg-emerald-500 text-slate-950 font-medium" : "bg-slate-900/60 border border-slate-800 text-slate-200"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <Bot size={16} className="animate-spin" />
                </div>
                <div className="rounded-2xl p-4 text-xs bg-slate-900/60 border border-slate-800 text-slate-400">
                  Analyzing your TradeLab database records...
                </div>
              </div>
            )}
          </div>

          {/* Suggested Quick Prompts */}
          <div className="mb-4">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">Suggested Queries:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(q)}
                  disabled={loading}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-900 hover:border-slate-700 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="sticky bottom-4 bg-slate-950 pt-2">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl">
              <input
                type="text"
                placeholder="Ask about your performance, journal, or trading plan..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={loading}
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !prompt.trim()}
                className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}