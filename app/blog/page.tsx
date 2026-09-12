// app/blog/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Flame,
  Star,
  Bookmark,
  TrendingUp,
  LineChart,
  Brain,
  Target,
  User,
  X,
  Filter,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "tips" | "market" | "psychology" | "updates" | "case-studies";
  author: string;
  authorBio?: string;
  authorAvatarColor?: string;
  date: string;
  readTime: number;
  imageUrl?: string;
  tags: string[];
  featured?: boolean;
}

const CATEGORIES = [
  { id: "all", label: "All Articles", icon: BookOpen, short: "All" },
  { id: "tips", label: "Trading Tips & Strategies", icon: TrendingUp, short: "Tips" },
  { id: "market", label: "Market Analysis", icon: LineChart, short: "Markets" },
  { id: "psychology", label: "Psychology Insights", icon: Brain, short: "Psychology" },
  { id: "updates", label: "Platform Updates", icon: Sparkles, short: "Updates" },
  { id: "case-studies", label: "Case Studies", icon: Target, short: "Case Studies" },
];

const BLOG_POSTS: BlogPost[] = [
  // ===== JOHN MAINA — Trading Tips & Strategies =====
  {
    id: "1",
    slug: "risk-management-ultimate-guide",
    title: "The Ultimate Guide to Risk Management in Forex Trading",
    excerpt:
      "Learn how professional traders protect their capital using position sizing, stop-loss placement, and the 1% rule. Master the art of surviving to trade another day.",
    category: "tips",
    author: "John Maina",
    authorBio: "Professional forex trader with 10+ years of experience in risk management.",
    authorAvatarColor: "from-emerald-500 to-cyan-500",
    date: "2026-09-08",
    readTime: 12,
    imageUrl: "/images/eurusd.jpg",
    tags: ["Risk Management", "Position Sizing", "Stop Loss"],
    featured: true,
  },
  {
    id: "2",
    slug: "candlestick-patterns-every-trader-should-know",
    title: "10 Candlestick Patterns Every Trader Should Know",
    excerpt:
      "From Doji to Engulfing patterns, master the 10 most reliable candlestick formations that signal potential market reversals and continuations.",
    category: "tips",
    author: "John Maina",
    authorBio: "Professional forex trader with 10+ years of experience in risk management.",
    authorAvatarColor: "from-emerald-500 to-cyan-500",
    date: "2026-08-28",
    readTime: 15,
    imageUrl: "/images/gbpjpy.jpg",
    tags: ["Technical Analysis", "Candlesticks", "Patterns"],
  },
  {
    id: "3",
    slug: "backtesting-strategies-guide",
    title: "Backtesting Your Trading Strategy: A Complete Guide",
    excerpt:
      "Learn how to properly backtest trading strategies using historical data. Avoid common backtesting mistakes and validate your edge before risking real capital.",
    category: "tips",
    author: "John Maina",
    authorBio: "Professional forex trader with 10+ years of experience in risk management.",
    authorAvatarColor: "from-emerald-500 to-cyan-500",
    date: "2026-08-20",
    readTime: 14,
    imageUrl: "/images/gbpusd.jpg",
    tags: ["Backtesting", "Strategy", "Analysis"],
  },

  // ===== RAPHAEL FX — Market Analysis =====
  {
    id: "4",
    slug: "eurusd-weekly-analysis",
    title: "EUR/USD Weekly Analysis: Key Levels to Watch",
    excerpt:
      "Technical and fundamental analysis of EUR/USD for the upcoming trading week. Major support and resistance zones, potential trade setups, and risk factors.",
    category: "market",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-09-04",
    readTime: 6,
    imageUrl: "/images/eurusd.jpg",
    tags: ["EUR/USD", "Market Analysis", "Forex"],
    featured: true,
  },
  {
    id: "5",
    slug: "federal-reserve-impact-currencies",
    title: "How Federal Reserve Decisions Impact Currency Markets",
    excerpt:
      "Understanding the relationship between Fed policy, interest rates, and currency movements. What every forex trader needs to know before the next FOMC meeting.",
    category: "market",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-08-25",
    readTime: 9,
    imageUrl: "/images/gbpusd.jpg",
    tags: ["Federal Reserve", "Interest Rates", "USD"],
  },
  {
    id: "6",
    slug: "gold-silver-outlook",
    title: "Gold & Silver Outlook: Safe Haven Demand in Focus",
    excerpt:
      "Analysis of precious metals amid global economic uncertainty. Key levels, correlations with the dollar, and potential trade opportunities.",
    category: "market",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-08-18",
    readTime: 8,
    imageUrl: "/images/xauusd.jpg",
    tags: ["Gold", "Silver", "Commodities"],
  },
  {
    id: "7",
    slug: "us30-index-analysis",
    title: "US30 Index Analysis: Dow Jones at Critical Levels",
    excerpt:
      "Complete breakdown of the Dow Jones Industrial Average. Key technical levels, market sentiment, and potential trade opportunities heading into next week.",
    category: "market",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-08-12",
    readTime: 7,
    imageUrl: "/images/us30.jpg",
    tags: ["US30", "Dow Jones", "Indices"],
  },
  {
    id: "8",
    slug: "nasdaq-tech-rally-analysis",
    title: "NASDAQ Analysis: Tech Rally Continues or Correction Ahead?",
    excerpt:
      "In-depth look at the NASDAQ 100. Key technical levels, tech sector performance, and what traders should watch for in the coming weeks.",
    category: "market",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-08-08",
    readTime: 8,
    imageUrl: "/images/nasdaq.jpg",
    tags: ["NASDAQ", "Tech Stocks", "Indices"],
  },

  // ===== PIPS MASTER — Psychology & Case Studies =====
  {
    id: "9",
    slug: "trading-psychology-fear-greed",
    title: "Trading Psychology: Mastering Fear and Greed",
    excerpt:
      "The two most powerful emotions in trading. Learn how to recognize when fear or greed is driving your decisions and how to build emotional discipline.",
    category: "psychology",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-09-05",
    readTime: 8,
    imageUrl: "/images/us30.jpg",
    tags: ["Psychology", "Emotions", "Discipline"],
    featured: true,
  },
  {
    id: "10",
    slug: "overcoming-revenge-trading",
    title: "Overcoming Revenge Trading: A Practical Guide",
    excerpt:
      "Revenge trading is one of the fastest ways to blow up an account. Learn practical strategies to recognize the urge and prevent emotional trading.",
    category: "psychology",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-08-22",
    readTime: 7,
    imageUrl: "/images/gbpjpy.jpg",
    tags: ["Psychology", "Revenge Trading", "Discipline"],
  },
  {
    id: "11",
    slug: "how-i-improved-win-rate-40-percent",
    title: "Case Study: How I Improved My Win Rate by 40%",
    excerpt:
      "A detailed breakdown of one trader's journey from inconsistent losses to consistent profitability using TradeLab analytics and journaling.",
    category: "case-studies",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-08-30",
    readTime: 10,
    imageUrl: "/images/nasdaq.jpg",
    tags: ["Case Study", "Win Rate", "Improvement"],
  },
  {
    id: "12",
    slug: "discipline-over-prediction",
    title: "Discipline Over Prediction: Why Consistency Beats Being Right",
    excerpt:
      "Most traders obsess over being right. The real edge comes from consistent execution. Here's how to shift your mindset from prediction to process.",
    category: "psychology",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-08-15",
    readTime: 9,
    imageUrl: "/images/eurusd.jpg",
    tags: ["Discipline", "Consistency", "Mindset"],
  },

  // ===== PLATFORM UPDATES =====
  {
    id: "13",
    slug: "introducing-advanced-journal",
    title: "Introducing: Advanced Trade Journal with 20+ Fields",
    excerpt:
      "We've completely rebuilt the trading journal with comprehensive fields for position sizing, risk management, psychology tracking, and dual chart screenshots.",
    category: "updates",
    author: "TradeLab Team",
    authorBio: "The team behind TradeLab.",
    authorAvatarColor: "from-amber-500 to-orange-500",
    date: "2026-09-02",
    readTime: 5,
    imageUrl: "/images/xauusd.jpg",
    tags: ["Product Update", "Journal", "Features"],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [activeAuthor, setActiveAuthor] = useState<string>("all");

  const AUTHORS = [
    { id: "all", name: "All Authors", color: "from-slate-600 to-slate-500" },
    { id: "John Maina", name: "John Maina", color: "from-emerald-500 to-cyan-500" },
    { id: "Raphael FX", name: "Raphael FX", color: "from-blue-500 to-cyan-500" },
    { id: "Pips Master", name: "Pips Master", color: "from-purple-500 to-pink-500" },
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;
      const matchesAuthor =
        activeAuthor === "all" || post.author === activeAuthor;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch && matchesAuthor;
    });
  }, [activeCategory, activeAuthor, searchQuery]);

  // Featured post only shows when no filters are applied
  const showFeatured =
    activeCategory === "all" &&
    searchQuery === "" &&
    activeAuthor === "all";
  const featuredPost = BLOG_POSTS.find((p) => p.featured);

  const regularPosts = filteredPosts.filter(
    (p) => !showFeatured || !p.featured
  );

  const hasActiveFilters =
    activeCategory !== "all" || activeAuthor !== "all" || searchQuery !== "";

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveAuthor("all");
  };

  const toggleSave = (id: string) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  };

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      tips: "border-emerald-500/30 bg-emerald-500/20 text-emerald-300",
      market: "border-blue-500/30 bg-blue-500/20 text-blue-300",
      psychology: "border-purple-500/30 bg-purple-500/20 text-purple-300",
      updates: "border-amber-500/30 bg-amber-500/20 text-amber-300",
      "case-studies": "border-rose-500/30 bg-rose-500/20 text-rose-300",
    };
    return colors[categoryId] || colors.tips;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Public Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md transition-all group-hover:scale-110">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Trade<span className="text-emerald-400">Lab</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition">
              Home
            </Link>
            <Link href="/education" className="text-sm text-slate-400 hover:text-white transition">
              Education
            </Link>
            <Link href="/blog" className="text-sm font-medium text-emerald-400">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-slate-300 hover:text-white transition"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <p className="text-sm font-medium text-emerald-400">
              Insights & Education
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            TradeLab Blog
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Trading tips, market analysis, psychology insights, and platform updates from our expert contributors.
          </p>
        </section>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-950/95 backdrop-blur border-b border-slate-800/60 mb-8">
          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles by title, topic, author, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-3 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 transition"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Author Filter */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <User size={12} className="text-slate-500" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Filter by Author
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {AUTHORS.map((author) => {
                const isActive = activeAuthor === author.id;
                return (
                  <button
                    key={author.id}
                    onClick={() => setActiveAuthor(author.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {author.id !== "all" && (
                      <span
                        className={`h-2 w-2 rounded-full bg-gradient-to-r ${author.color}`}
                      />
                    )}
                    {author.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter size={12} className="text-slate-500" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Filter by Category
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                      isActive
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <Icon size={13} />
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.short}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filters Indicator */}
          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Filter size={12} className="text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} match
                </span>
              </div>
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
              >
                <X size={12} />
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Featured Post */}
        {showFeatured && featuredPost && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Featured Article
              </h2>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
            >
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full lg:min-h-[400px] bg-gradient-to-br from-emerald-950/40 to-cyan-950/40 overflow-hidden">
                  {featuredPost.imageUrl && (
                    <Image
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald-300">
                      <Flame size={12} />
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-3 self-start">
                    {getCategoryInfo(featuredPost.category).label}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>

                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r ${
                          featuredPost.authorAvatarColor ||
                          "from-emerald-500 to-cyan-500"
                        } text-[10px] font-bold text-white`}
                      >
                        {featuredPost.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className="font-medium text-slate-300">
                        {featuredPost.author}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {featuredPost.readTime} min read
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    Read Article
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Posts Grid */}
        {regularPosts.length === 0 && !showFeatured ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center">
            <BookOpen size={40} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No articles found
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Try adjusting your search, author, or category filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                {!hasActiveFilters
                  ? "Latest Articles"
                  : `${regularPosts.length} Article${
                      regularPosts.length !== 1 ? "s" : ""
                    } Found`}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => {
                const categoryInfo = getCategoryInfo(post.category);
                const isSaved = savedPosts.includes(post.id);
                return (
                  <article
                    key={post.id}
                    className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950"
                    >
                      {post.imageUrl && (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {categoryInfo.label.split(" ")[0]}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSave(post.id);
                        }}
                        className={`absolute top-3 right-3 rounded-full p-2 backdrop-blur-sm transition ${
                          isSaved
                            ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                            : "bg-black/40 text-white/80 border border-white/20 hover:bg-black/60"
                        }`}
                        aria-label={isSaved ? "Unsave article" : "Save article"}
                      >
                        <Bookmark
                          size={14}
                          className={isSaved ? "fill-emerald-300" : ""}
                        />
                      </button>
                    </Link>

                    <div className="flex flex-1 flex-col p-5">
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-950/50 px-2 py-0.5 text-[10px] text-slate-500"
                          >
                            <Tag size={8} />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r ${
                              post.authorAvatarColor ||
                              "from-emerald-500 to-cyan-500"
                            } text-[10px] font-bold text-white`}
                          >
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <span className="font-medium text-slate-400">
                            {post.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {post.readTime}m
                          </span>
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {/* Contributors Section */}
        {!hasActiveFilters && (
          <section className="mt-16">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                Meet Our Contributors
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Expert traders and analysts sharing their knowledge
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AUTHORS.filter((a) => a.id !== "all").map((author, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveAuthor(author.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-left hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${author.color} text-sm font-bold text-white`}
                    >
                      {author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                        {author.name}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                        {author.id === "John Maina" &&
                          "Trading Tips & Strategies"}
                        {author.id === "Raphael FX" && "Market Analysis"}
                        {author.id === "Pips Master" && "Trading Psychology"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {BLOG_POSTS.find((p) => p.author === author.id)?.authorBio}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="mt-16 rounded-2xl border border-slate-800 bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-purple-950/40 p-8 sm:p-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="h-7 w-7 text-emerald-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Stay Updated with New Articles
            </h2>
            <p className="max-w-2xl text-sm text-slate-400">
              Get trading tips, market analysis, and psychology insights
              delivered straight to your inbox. No spam, unsubscribe anytime.
            </p>

            <div className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition"
              />
              <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              Join 2,500+ traders already subscribed
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}