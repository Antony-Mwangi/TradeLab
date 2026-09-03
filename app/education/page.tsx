'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  BarChart3,
  Brain,
  Shield,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Star,
  GraduationCap,
  LineChart,
  Activity,
  Zap,
  Award,
  Users,
  Video,
  FileText,
  BookMarked,
  Lightbulb,
  Rocket,
  Flame,
  Library,
  Compass,
} from "lucide-react";

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const coreSubjects = [
    {
      icon: BookOpen,
      title: "Market Mechanics & Terminology",
      description: "Understand how currency pairs work (base vs. quote currency), major/minor/exotic pairs, and basic metrics like pips, spreads, lots, and leverage/margin.",
      topics: ["Currency Pairs", "Pips & Spreads", "Leverage & Margin", "Lot Sizes"],
      color: "emerald"
    },
    {
      icon: LineChart,
      title: "Technical Analysis",
      description: "Learn how to read price charts (candlesticks), identify trends, support and resistance levels, and use technical indicators like Moving Averages, RSI, and MACD.",
      topics: ["Candlestick Patterns", "Support & Resistance", "Moving Averages", "RSI & MACD"],
      color: "blue"
    },
    {
      icon: BarChart3,
      title: "Fundamental Analysis",
      description: "Study how global macroeconomics—such as central bank interest rates, inflation data, employment reports, and geopolitical events—drive currency valuations.",
      topics: ["Interest Rates", "Inflation Data", "Employment Reports", "Geopolitical Events"],
      color: "amber"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Master capital protection rules, including calculating position sizes, setting strict stop-loss and take-profit orders, and never risking more than 1% to 2% of an account on a single trade.",
      topics: ["Position Sizing", "Stop-Loss Orders", "Risk-Reward Ratio", "Capital Protection"],
      color: "purple"
    },
    {
      icon: Brain,
      title: "Trading Psychology",
      description: "Develop emotional discipline to manage greed, fear, and impatience, recognizing that psychological control is often the biggest hurdle to long-term consistency.",
      topics: ["Emotional Control", "Discipline", "Patience", "Mindset Mastery"],
      color: "rose"
    }
  ];

  const learningSteps = [
    {
      number: "01",
      title: "Emphasize Education Before Capital",
      description: "Spend at least 3 to 6 months studying the foundational theory and reading reputable trading books or courses before depositing any real money.",
      icon: GraduationCap,
      color: "emerald"
    },
    {
      number: "02",
      title: "Recommend a Demo Account First",
      description: "Open a risk-free demo account with a regulated broker to practice executing orders, testing strategies, and getting used to trading platforms like MetaTrader without financial risk.",
      icon: Rocket,
      color: "blue"
    },
    {
      number: "03",
      title: "Guide Them Toward a Structured Plan",
      description: "Outline a personal trading plan that defines their goals, preferred assets (e.g., starting with major pairs like EUR/USD), and specific risk parameters.",
      icon: Target,
      color: "amber"
    },
    {
      number: "04",
      title: "Promote a Trading Journal",
      description: "Log every practice trade—recording why they entered, how they managed risk, and the final outcome—to systematically learn from mistakes.",
      icon: BookMarked,
      color: "purple"
    },
    {
      number: "05",
      title: "Manage Expectations Realistically",
      description: "Understand the high failure rate among retail traders, emphasizing that forex is a long-term skill requiring immense patience rather than a get-rich-quick scheme.",
      icon: Shield,
      color: "rose"
    }
  ];

  const recommendedResources = [
    {
      title: "Trading in the Zone",
      author: "Mark Douglas",
      description: "Master the mental game of trading with this psychology-focused classic.",
      type: "Book",
      icon: BookOpen,
      color: "emerald"
    },
    {
      title: "Technical Analysis of the Financial Markets",
      author: "John J. Murphy",
      description: "The complete guide to technical analysis and chart reading.",
      type: "Book",
      icon: BookOpen,
      color: "blue"
    },
    {
      title: "Forex Price Action Course",
      author: "Nial Fuller",
      description: "Learn to trade price action patterns and understand market structure.",
      type: "Course",
      icon: Video,
      color: "amber"
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      description: "Understanding the behavioral aspects of trading and investing.",
      type: "Book",
      icon: BookOpen,
      color: "purple"
    }
  ];

  const commonMistakes = [
    "Trading without a stop-loss order",
    "Overtrading and revenge trading",
    "Using too much leverage",
    "Ignoring fundamental analysis",
    "Failing to keep a trading journal",
    "Chasing losses instead of following the plan"
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl animate-float" />
      <div className="fixed -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-emerald-500/10 blur-3xl animate-float animation-delay-600" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 blur-3xl animate-pulse-slow" />

      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_50%)]" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block animate-float-subtle">
                <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-emerald-400 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-semibold tracking-wide">Forex Education</span>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 animate-spin-slow" />
                </div>
              </div>

              <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight animate-fade-up">
                Master the Art of
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-text mt-2">
                  Forex Trading
                </span>
              </h1>

              <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-gray-400 animate-fade-up animation-delay-200">
                Your comprehensive guide to understanding the forex market. From market mechanics
                to trading psychology, learn everything you need to start your trading journey.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
                <a
                  href="#core-subjects"
                  className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-95"
                >
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  Explore Core Subjects
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </a>
                <a
                  href="#learning-path"
                  className="inline-flex items-center gap-2 sm:gap-3 rounded-xl border border-gray-800 bg-gray-900/30 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-300 transition-all duration-300 hover:scale-105 hover:border-gray-700 hover:bg-gray-900/50 active:scale-95"
                >
                  <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  View Learning Path
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Stats */}
              <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 animate-fade-up animation-delay-400">
                <div className="text-center bg-gradient-to-b from-emerald-950/30 to-black/50 px-3 sm:px-4 py-4 sm:py-5 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">5+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">Core Subjects</p>
                </div>
                <div className="text-center bg-gradient-to-b from-blue-950/30 to-black/50 px-3 sm:px-4 py-4 sm:py-5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">100+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">Learning Topics</p>
                </div>
                <div className="text-center bg-gradient-to-b from-purple-950/30 to-black/50 px-3 sm:px-4 py-4 sm:py-5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">12+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">Recommended Books</p>
                </div>
                <div className="text-center bg-gradient-to-b from-amber-950/30 to-black/50 px-3 sm:px-4 py-4 sm:py-5 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-105">
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">87%</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">Success Rate with Journaling</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Subjects Section */}
        <section id="core-subjects" className="py-16 sm:py-20 lg:py-24 border-t border-gray-800 bg-gradient-to-b from-black to-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block animate-float-subtle">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400">
                  <BookMarked className="h-4 w-4" />
                  Core Subjects
                </span>
              </div>
              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                What You'll Learn
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
                Master the essential subjects that every successful forex trader needs to understand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {coreSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-${subject.color}-500/10 text-${subject.color}-400 mb-4 sm:mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <subject.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  
                  <h3 className={`text-lg sm:text-xl font-bold text-white group-hover:text-${subject.color}-400 transition-colors`}>
                    {subject.title}
                  </h3>
                  
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                    {subject.description}
                  </p>

                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                    {subject.topics.map((topic, i) => (
                      <span
                        key={i}
                        className={`inline-block rounded-full border border-${subject.color}-500/20 bg-${subject.color}-500/5 px-3 py-1 text-[10px] sm:text-xs text-${subject.color}-400`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Path Section */}
        <section id="learning-path" className="py-16 sm:py-20 lg:py-24 border-t border-gray-800 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block animate-float-subtle">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-amber-400">
                  <Rocket className="h-4 w-4" />
                  Your Learning Path
                </span>
              </div>
              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Steps to <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">Mastery</span>
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
                Follow this structured approach to build your forex trading skills systematically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
              {learningSteps.map((step, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <span className={`text-3xl sm:text-4xl font-extrabold text-${step.color}-400 group-hover:scale-110 transition-transform`}>
                      {step.number}
                    </span>
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-${step.color}-500/10 text-${step.color}-400 transition-all duration-300 group-hover:scale-110`}>
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold text-white group-hover:text-${step.color}-400 transition-colors`}>
                    {step.title}
                  </h3>

                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Learning Path Visual */}
            <div className="mt-12 sm:mt-16 rounded-2xl border border-gray-800 bg-gradient-to-r from-emerald-950/20 to-cyan-950/20 p-6 sm:p-8 lg:p-10 animate-fade-up">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <Clock className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-white">Recommended Timeline</p>
                    <p className="text-xs sm:text-sm text-gray-400">3-6 months of dedicated study before live trading</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs sm:text-sm text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Demo Account
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs sm:text-sm text-blue-400">
                    <BookOpen className="h-4 w-4" />
                    Theory Study
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-xs sm:text-sm text-amber-400">
                    <Target className="h-4 w-4" />
                    Trading Plan
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2 text-xs sm:text-sm text-purple-400">
                    <BookMarked className="h-4 w-4" />
                    Journaling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Resources */}
        <section className="py-16 sm:py-20 lg:py-24 border-t border-gray-800 bg-gradient-to-b from-black to-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block animate-float-subtle">
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-purple-400">
                  <Library className="h-4 w-4" />
                  Recommended Resources
                </span>
              </div>
              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Start <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Reading</span> Today
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
                Essential books and courses to accelerate your forex trading education.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {recommendedResources.map((resource, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 p-6 transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-${resource.color}-500/10 text-${resource.color}-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <resource.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-{resource.color}-400 transition-colors">
                    {resource.title}
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-emerald-400 font-semibold">
                    {resource.author}
                  </p>

                  <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className={`inline-block rounded-full border border-${resource.color}-500/20 bg-${resource.color}-500/5 px-3 py-1 text-[10px] sm:text-xs text-${resource.color}-400`}>
                      {resource.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Resource Note */}
            <div className="mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                These resources are widely recommended by successful traders and educators in the forex community.
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="py-16 sm:py-20 lg:py-24 border-t border-gray-800 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block animate-float-subtle">
                <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-red-400">
                  <Flame className="h-4 w-4" />
                  Avoid These Mistakes
                </span>
              </div>
              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Common <span className="text-transparent bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text">Pitfalls</span>
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
                Learn from the mistakes that most beginner traders make.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {commonMistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-800 bg-gray-900/30 p-4 sm:p-5 transition-all duration-300 hover:border-red-500/30 hover:bg-gray-900/50 hover:scale-[1.02] animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-all duration-300 group-hover:scale-110">
                    <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-300 font-medium">{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Learn Next Section */}
        <section className="py-16 sm:py-20 lg:py-24 border-t border-gray-800 bg-gradient-to-b from-black to-gray-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block animate-float-subtle">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-cyan-400">
                  <TrendingUp className="h-4 w-4" />
                  What to Focus On First
                </span>
              </div>
              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Where to <span className="text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text">Begin</span>
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
                A beginner-friendly roadmap to start your forex education journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 p-6 sm:p-8 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 animate-fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Start with Theory</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Begin with <strong className="text-white">Market Mechanics & Terminology</strong> to understand the basics. 
                  Then move to <strong className="text-white">Technical Analysis</strong> to learn how to read charts 
                  and identify trading opportunities.
                </p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Practice with Purpose</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Open a <strong className="text-white">demo account</strong> to practice what you've learned. 
                  Focus on <strong className="text-white">Risk Management</strong> from day one and keep a 
                  <strong className="text-white"> trading journal</strong> to track your progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Note Section */}
        <section className="py-12 sm:py-16 border-t border-gray-800 bg-black">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-block mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400">
                <Lightbulb className="h-4 w-4" />
                <span className="font-semibold">Remember</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Forex trading is a journey, not a destination. The most successful traders 
              are those who commit to <span className="text-white font-semibold">continuous learning</span>, 
              maintain <span className="text-white font-semibold">disciplined risk management</span>, 
              and develop <span className="text-white font-semibold">emotional resilience</span> 
              through consistent practice and reflection.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Stay patient
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Stay disciplined
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Stay curious
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Stay consistent
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}