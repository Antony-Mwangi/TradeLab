// app/ai/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  BarChart3,
  Brain,
  Target,
  TrendingUp,
  Calendar,
  BookOpen,
  RefreshCw,
  Zap,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIPage() {
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [likedIndex, setLikedIndex] = useState<number | null>(null);
  const [dislikedIndex, setDislikedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your TradeLab AI Analyst. I have secure access to your journal, analytics, and trading plans.\n\nHow can I help you review and improve your performance today?",
      timestamp: new Date(),
    },
  ]);

  const suggestedQuestions = [
    {
      icon: BarChart3,
      text: "Analyze my recent trading performance",
      color: "blue",
    },
    {
      icon: Target,
      text: "What are my biggest mistakes or rule violations?",
      color: "rose",
    },
    {
      icon: BookOpen,
      text: "Am I following my trading plan consistently?",
      color: "emerald",
    },
    {
      icon: Brain,
      text: "Analyze my psychology and emotional triggers",
      color: "purple",
    },
    {
      icon: TrendingUp,
      text: "What should I focus on improving this week?",
      color: "amber",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: query,
      timestamp: new Date(),
    };
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
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I encountered an error analyzing your data. Please try again.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Error communicating with AI endpoint:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error connecting to TradeLab AI service.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    if (confirm("Start a new conversation? Current messages will be cleared.")) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm your TradeLab AI Analyst. I have secure access to your journal, analytics, and trading plans.\n\nHow can I help you review and improve your performance today?",
          timestamp: new Date(),
        },
      ]);
    }
  };

  // ===== Markdown-like formatter =====
  const formatMessage = (content: string) => {
    const paragraphs = content.split(/\n\n+/);

    return paragraphs.map((paragraph, idx) => {
      // Bullet points
      if (paragraph.includes("\n•") || paragraph.includes("\n- ")) {
        const lines = paragraph.split("\n");
        const title = lines[0];
        const bullets = lines.slice(1).filter((line) => line.trim());

        return (
          <div key={idx} className="mb-3">
            {title &&
              !title.startsWith("•") &&
              !title.startsWith("-") && (
                <p className="font-medium text-slate-200 mb-2">{title}</p>
              )}
            <ul className="space-y-1.5">
              {bullets.map((bullet, bIdx) => {
                const cleanBullet = bullet.replace(/^[•\-]\s*/, "");
                return (
                  <li
                    key={bIdx}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className="text-emerald-400 font-bold mt-0.5">
                      •
                    </span>
                    <span>{cleanBullet}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }

      // Numbered lists
      if (paragraph.match(/\n\d\./)) {
        const lines = paragraph.split("\n");
        const title = lines[0];
        const items = lines.slice(1).filter((line) => line.trim());

        return (
          <div key={idx} className="mb-3">
            {title && !title.match(/^\d\./) && (
              <p className="font-medium text-slate-200 mb-2">{title}</p>
            )}
            <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^\d\.\s*/, "");
                return (
                  <li key={iIdx} className="pl-1">
                    {cleanItem}
                  </li>
                );
              })}
            </ol>
          </div>
        );
      }

      // Headers with colon
      if (paragraph.includes(":**")) {
        const parts = paragraph.split(":**");
        return (
          <div key={idx} className="mb-3">
            <span className="font-semibold text-emerald-400">
              {parts[0]}:
            </span>
            <span className="text-slate-300">{parts[1]}</span>
          </div>
        );
      }

      // Regular paragraph with **bold** support
      return (
        <p key={idx} className="mb-3 text-slate-300 leading-relaxed last:mb-0">
          {paragraph.split(/\*\*(.*?)\*\*/g).map((part, pIdx) => {
            if (pIdx % 2 === 1) {
              return (
                <strong key={pIdx} className="text-white font-semibold">
                  {part}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  const getSuggestionColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "hover:border-blue-500/40 hover:bg-blue-500/5 text-blue-400",
      rose: "hover:border-rose-500/40 hover:bg-rose-500/5 text-rose-400",
      emerald:
        "hover:border-emerald-500/40 hover:bg-emerald-500/5 text-emerald-400",
      purple:
        "hover:border-purple-500/40 hover:bg-purple-500/5 text-purple-400",
      amber: "hover:border-amber-500/40 hover:bg-amber-500/5 text-amber-400",
    };
    return colors[color] || colors.emerald;
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">Loading TradeLab AI...</p>
      </div>
    );
  }

  const userName = session?.user?.name || "Trader";

  return (
    <>
      {/* Page Header */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
                <Sparkles size={14} className="text-white" />
              </div>
              <p className="text-sm font-medium text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                AI-Powered Analysis
              </p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
              TradeLab AI Analyst
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Personalized insights from your trading data — journal, analytics,
              psychology, and plan.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:border-slate-700 transition"
          >
            <RefreshCw size={13} />
            New Chat
          </button>
        </div>
      </section>

      {/* Main Chat Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col">
        {/* Chat Header Bar */}
        <div className="border-b border-slate-800 bg-slate-950/50 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">
              AI Online
            </span>
            <span className="text-[10px] text-slate-600">•</span>
            <span className="text-[10px] text-slate-500">
              Connected to your data
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Zap size={11} className="text-amber-400" />
            Powered by TradeLab
          </div>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 max-h-[calc(100vh-28rem)] min-h-[400px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 animate-fade-up ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
            >
              {/* Avatar */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-lg ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white"
                    : "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-400"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={16} />
                ) : (
                  <Bot size={16} />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 max-w-[85%] ${
                  msg.role === "user" ? "flex justify-end" : ""
                }`}
              >
                <div
                  className={`rounded-2xl p-4 sm:p-5 shadow-lg ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white"
                      : "bg-slate-950 border border-slate-800"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="text-sm font-medium leading-relaxed">
                      {msg.content}
                    </p>
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none">
                      {formatMessage(msg.content)}
                    </div>
                  )}

                  {/* Timestamp + Actions (Assistant only) */}
                  {msg.role === "assistant" && (
                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3">
                      <span className="text-[10px] text-slate-500">
                        {msg.timestamp?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>

                      <button
                        onClick={() => handleCopy(msg.content, index)}
                        className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1 ml-auto">
                        <button
                          onClick={() => setLikedIndex(index)}
                          className={`rounded-lg p-1.5 transition ${
                            likedIndex === index
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                          }`}
                          title="Helpful"
                        >
                          <ThumbsUp size={11} />
                        </button>
                        <button
                          onClick={() => setDislikedIndex(index)}
                          className={`rounded-lg p-1.5 transition ${
                            dislikedIndex === index
                              ? "bg-red-500/10 text-red-400"
                              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                          }`}
                          title="Not helpful"
                        >
                          <ThumbsDown size={11} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-start gap-3 animate-fade-up">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-400">
                <Bot size={16} />
              </div>
              <div className="rounded-2xl p-5 bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-sm text-slate-400">
                    Analyzing your TradeLab records...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="border-t border-slate-800 px-5 pt-4 pb-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Lightbulb size={11} className="text-amber-400" />
              Suggested Queries
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedQuestions.map((q, i) => {
                const Icon = q.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q.text)}
                    disabled={loading}
                    className={`group flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2.5 text-xs font-medium transition text-left ${getSuggestionColor(
                      q.color
                    )} disabled:opacity-50`}
                  >
                    <Icon
                      size={14}
                      className="shrink-0 transition-transform group-hover:scale-110"
                    />
                    <span className="text-slate-300 group-hover:text-white transition line-clamp-1">
                      {q.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Box */}
        <div className="border-t border-slate-800 bg-slate-950/50 p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 p-1.5 shadow-xl focus-within:border-emerald-500/50 transition">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about your performance, journal, or trading plan..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              disabled={loading}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed transition"
            >
              <Send size={14} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-600">
            TradeLab AI analyzes your secure journal data to provide
            personalized insights
          </p>
        </div>
      </div>
    </>
  );
}