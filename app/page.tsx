import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  FlaskConical,
  NotebookPen,
  ShieldCheck,
  Target,
  TrendingUp,
  Zap,
  Clock,
  Activity,
  LineChart,
  AlertTriangle,
  Lightbulb,
  Award,
  Sparkles,
  Rocket,
  Flame,
  ChartNoAxesCombined,
  CandlestickChart,
  ChevronRight,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
        {/* HERO - Premium Dark Background */}
        <section className="relative overflow-hidden">
          {/* Animated gradient orbs - premium dark */}
          <div className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-500/20 blur-3xl animate-float" />
          <div className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-emerald-500/15 blur-3xl animate-float animation-delay-600" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_50%)]" />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 animate-float-subtle animation-delay-200">
              <Star className="h-4 w-4 text-emerald-300/20" />
            </div>
            <div className="absolute top-40 right-20 animate-float-subtle animation-delay-400">
              <Star className="h-3 w-3 text-cyan-300/20" />
            </div>
            <div className="absolute bottom-32 left-1/4 animate-float-subtle animation-delay-600">
              <Star className="h-5 w-5 text-purple-300/15" />
            </div>
            <div className="absolute top-1/3 right-1/3 animate-float-subtle animation-delay-800">
              <Star className="h-3 w-3 text-amber-300/15" />
            </div>
            <div className="absolute bottom-20 right-1/4 animate-float-subtle animation-delay-1000">
              <Star className="h-4 w-4 text-emerald-300/10" />
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-5xl text-center">
              {/* Animated badge */}
              <div className="inline-block animate-float-subtle">
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 text-base text-emerald-400 backdrop-blur-sm shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <Sparkles className="h-4 w-4 text-amber-400 animate-spin-slow" />
                  <span className="font-semibold tracking-wide">Your trading performance workspace</span>
                  <Sparkles className="h-4 w-4 text-amber-400 animate-spin-slow" />
                </div>
              </div>

              {/* Animated heading - Bigger */}
              <h1 className="mt-10 text-6xl font-extrabold leading-tight tracking-tight animate-fade-up text-white sm:text-7xl lg:text-8xl">
                Turn your trading data into
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-text mt-2">
                  actionable insights.
                </span>
              </h1>

              {/* Animated paragraph - Bigger */}
              <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-gray-400 animate-fade-up animation-delay-200 sm:text-2xl">
                Journal every trade, analyze your performance, backtest strategies,
                and understand the psychology behind your decisions.
              </p>

              {/* Animated CTA buttons - Bigger */}
              <div className="mt-12 flex flex-col justify-center gap-5 animate-fade-up animation-delay-300 sm:flex-row">
                <a
                  href="/register"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-95"
                >
                  <Rocket className="h-5 w-5 animate-bounce-subtle" />
                  <span>Start trading better</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
                </a>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-10 py-5 text-lg font-semibold text-gray-300 transition-all duration-300 hover:scale-105 hover:bg-gray-900/50 hover:border-gray-500 active:scale-95 backdrop-blur-sm group"
                >
                  <Flame className="h-5 w-5 mr-3 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                  Explore features
                  <ChevronRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </a>
              </div>

              {/* Hero Image */}
              <div className="mt-16 animate-fade-up animation-delay-400">
                <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-emerald-500/10 group hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.01]">
                  <div className="relative w-full h-80 sm:h-96 lg:h-[500px] bg-gradient-to-r from-emerald-950/30 to-cyan-950/30">
                    <Image
                      src="/images/CHART1.jpg"
                      alt="Trading charts and analysis"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-3">
                      <span className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 border border-white/10">Live Charts</span>
                      <span className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 border border-white/10">Real-time Data</span>
                      <span className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 border border-white/10">Advanced Analysis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading stats - Enhanced */}
              <div className="mt-16 flex flex-wrap justify-center gap-10 animate-fade-up animation-delay-500">
                <div className="text-center bg-gradient-to-b from-emerald-950/30 to-black/50 px-8 py-5 rounded-2xl border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 group">
                  <p className="text-3xl font-extrabold text-emerald-400 group-hover:scale-110 transition-transform">95%</p>
                  <p className="text-sm text-gray-500 font-medium">of traders fail to journal</p>
                </div>
                <div className="text-center bg-gradient-to-b from-amber-950/30 to-black/50 px-8 py-5 rounded-2xl border border-amber-500/20 shadow-lg hover:shadow-amber-500/20 hover:scale-105 transition-all duration-300 group">
                  <p className="text-3xl font-extrabold text-amber-400 group-hover:scale-110 transition-transform">3.2x</p>
                  <p className="text-sm text-gray-500 font-medium">better performance with review</p>
                </div>
                <div className="text-center bg-gradient-to-b from-purple-950/30 to-black/50 px-8 py-5 rounded-2xl border border-purple-500/20 shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 group">
                  <p className="text-3xl font-extrabold text-purple-400 group-hover:scale-110 transition-transform">67%</p>
                  <p className="text-sm text-gray-500 font-medium">improvement in consistency</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY TRADING DATA MATTERS */}
        <section className="border-y border-gray-800 bg-gradient-to-b from-black to-gray-950 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-amber-500/20 bg-amber-500/5 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-amber-400 animate-float-subtle shadow-lg shadow-amber-500/10 hover:scale-105 transition-transform duration-300">
                <Sparkles className="inline h-4 w-4 mr-2 animate-spin-slow" />
                The data-driven trader
              </p>
              <h2 className="mt-8 text-5xl font-extrabold tracking-tight animate-fade-up text-white sm:text-6xl">
                What gets measured gets <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">improved.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-400 animate-fade-up animation-delay-200">
                Trading without tracking is like navigating without a map. 
                Every trade is a data point waiting to be analyzed.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3 animate-fade-up animation-delay-300">
              {[
                {
                  icon: Activity,
                  title: "Track everything",
                  desc: "Every trade, setup, emotion, and outcome creates your trading history.",
                  color: "emerald"
                },
                {
                  icon: LineChart,
                  title: "Identify patterns",
                  desc: "Find what works, what doesn't, and what you're unconsciously repeating.",
                  color: "amber"
                },
                {
                  icon: Award,
                  title: "Build consistency",
                  desc: "Data reveals your strengths and exposes areas needing discipline.",
                  color: "purple"
                }
              ].map((item, i) => (
                <div key={i} className={`border-l-2 border-${item.color}-500/30 pl-8 py-4 hover:border-${item.color}-500 transition-all hover:bg-${item.color}-500/5 rounded-r-2xl group hover:scale-[1.03] duration-300 hover:shadow-xl`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-400 mb-4 group-hover:rotate-12 transition-transform duration-300 group-hover:scale-110`} />
                  <h3 className="text-2xl font-bold text-white group-hover:text-${item.color}-400 transition-colors">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 bg-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-emerald-500/5 to-transparent rounded-full blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-emerald-400 animate-float-subtle shadow-lg shadow-emerald-500/10 hover:scale-105 transition-transform duration-300">
                <Zap className="inline h-4 w-4 mr-2 text-amber-400" />
                Built around your process
              </p>
              <h2 className="mt-8 text-5xl font-extrabold tracking-tight animate-fade-up text-white sm:text-6xl">
                Everything you need to <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">study</span> your trading.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-400 animate-fade-up animation-delay-200">
                TradeLab provides the tools to document, measure, test, and improve 
                your trading process—without executing trades for you.
              </p>
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-2 animate-fade-up animation-delay-300">
              <div className="space-y-8">
                {[
                  {
                    icon: NotebookPen,
                    title: "Trading Journal",
                    desc: "Keep a structured record of your trades, setups, entry reasons, emotions, screenshots, and post-trade observations.",
                    color: "emerald"
                  },
                  {
                    icon: BarChart3,
                    title: "Performance Analytics",
                    desc: "Study your results through performance metrics, equity curves, drawdown, win rate, expectancy, and risk-adjusted returns.",
                    color: "blue"
                  },
                  {
                    icon: FlaskConical,
                    title: "Strategy Backtesting",
                    desc: "Test trading ideas against historical market data and evaluate their performance before committing real capital.",
                    color: "amber"
                  },
                  {
                    icon: Brain,
                    title: "Trading Psychology",
                    desc: "Track emotions, discipline, and behavioral patterns to understand how psychology influences every trading decision.",
                    color: "purple"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="group flex items-start gap-6 border-b border-gray-800 pb-8 hover:border-transparent transition-all hover:pl-6 hover:bg-gradient-to-r hover:from-gray-900/50 to-transparent rounded-r-2xl hover:shadow-xl"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-${feature.color}-500/10 text-${feature.color}-400 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-${feature.color}-500/20 group-hover:rotate-6`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold text-white transition-colors group-hover:text-${feature.color}-400`}>
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-400 leading-relaxed max-w-2xl">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-emerald-500/10 group hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02]">
                <div className="relative w-full h-[500px] bg-gradient-to-r from-emerald-950/30 to-cyan-950/30">
                  <Image
                    src="/images/CHART2.jpg"
                    alt="TradeLab features dashboard"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6">
                    <span className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/10">Dashboard Preview</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 animate-fade-up animation-delay-400">
              {[
                {
                  icon: Target,
                  title: "Trading Plans",
                  desc: "Define your trading rules, setups, risk limits, and conditions before you enter the market.",
                  color: "rose"
                },
                {
                  icon: ShieldCheck,
                  title: "Risk Management",
                  desc: "Monitor your risk exposure, drawdown, and consistency to develop stronger risk-management habits.",
                  color: "teal"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-6 border border-gray-800 p-8 rounded-2xl hover:shadow-2xl transition-all hover:scale-[1.02] duration-300 hover:border-${feature.color}-500/30"
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-${feature.color}-500/10 text-${feature.color}-400 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-${feature.color}-500/20 group-hover:rotate-6`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-white transition-colors group-hover:text-${feature.color}-400`}>
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ANALYSIS SECTION */}
        <section className="border-y border-gray-800 bg-gradient-to-b from-black to-gray-950 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/5 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-cyan-400 animate-float-subtle shadow-lg shadow-cyan-500/10 hover:scale-105 transition-transform duration-300">
                  <LineChart className="inline h-4 w-4 mr-2" />
                  Turn data into insight
                </p>
                <h2 className="mt-8 text-5xl font-extrabold tracking-tight animate-fade-up text-white sm:text-6xl">
                  Find out what is actually <span className="text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text">working.</span>
                </h2>
                <p className="mt-6 text-xl leading-relaxed text-gray-400 animate-fade-up animation-delay-200">
                  Instead of relying on memory, use your trading history to understand 
                  your performance across different strategies, markets, sessions, and conditions.
                </p>

                <div className="mt-10 space-y-5 animate-fade-up animation-delay-300">
                  {[
                    "Analyze performance by strategy and setup",
                    "Compare different markets and trading sessions",
                    "Track risk, drawdown, and consistency",
                    "Identify patterns that are difficult to see manually",
                    "Measure your edge and confidence intervals"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group hover:pl-3 transition-all">
                      <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-400 group-hover:scale-110 transition-transform group-hover:text-cyan-400" />
                      <p className="text-base text-gray-400 group-hover:text-white transition-colors font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 animate-fade-up animation-delay-400">
                <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-500/10 group hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative w-full h-56 bg-gradient-to-r from-cyan-950/30 to-emerald-950/30">
                    <Image
                      src="/images/CHART3.jpg"
                      alt="Analysis charts"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {[
                  { text: "Strategy Performance", desc: "Compare the historical results of your different trading setups and refine what works.", color: "cyan" },
                  { text: "Behavioral Patterns", desc: "Understand the relationship between your emotions, decisions, and trading results.", color: "purple" },
                  { text: "Risk Analysis", desc: "Review how your risk-taking behavior affects your overall trading performance.", color: "amber" },
                  { text: "Edge Measurement", desc: "Calculate your real edge and confidence intervals to trade with conviction.", color: "emerald" }
                ].map((item, i) => (
                  <div key={i} className={`border-l-2 border-${item.color}-500/30 pl-6 py-4 hover:border-${item.color}-500 transition-all hover:bg-${item.color}-500/5 rounded-r-2xl group hover:scale-[1.02] duration-300 hover:shadow-xl`}>
                    <p className={`text-lg font-bold text-${item.color}-400`}>{item.text}</p>
                    <p className="mt-1 text-base text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PSYCHOLOGY SECTION */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-purple-500/20 bg-purple-500/5 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-purple-400 animate-float-subtle shadow-lg shadow-purple-500/10 hover:scale-105 transition-transform duration-300">
                <Brain className="inline h-4 w-4 mr-2" />
                Trading psychology
              </p>
              <h2 className="mt-8 text-5xl font-extrabold tracking-tight animate-fade-up text-white sm:text-6xl">
                Your strategy is only <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">part</span> of the equation.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-400 animate-fade-up animation-delay-200">
                Your decisions are influenced by confidence, fear, impatience, FOMO, 
                and other emotions. Track them to identify recurring patterns.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3 animate-fade-up animation-delay-300">
              {[
                {
                  icon: Brain,
                  title: "Track emotions",
                  desc: "Record how you felt before and after each trade to identify emotional triggers.",
                  color: "purple"
                },
                {
                  icon: AlertTriangle,
                  title: "Review decisions",
                  desc: "Compare what you planned to do with what you actually did in the moment.",
                  color: "amber"
                },
                {
                  icon: Lightbulb,
                  title: "Build discipline",
                  desc: "Use your history to recognize behaviors you want to improve and reinforce.",
                  color: "emerald"
                }
              ].map((item, i) => (
                <div key={i} className={`border-t-2 border-${item.color}-500/20 pt-8 hover:border-${item.color}-500 transition-all hover:bg-${item.color}-500/5 rounded-2xl p-6 group hover:scale-[1.05] duration-300 hover:shadow-2xl`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-400 mb-4 group-hover:rotate-12 transition-transform duration-300 group-hover:scale-110`} />
                  <h3 className="text-2xl font-bold text-white group-hover:text-${item.color}-400 transition-colors">{item.title}</h3>
                  <p className="mt-3 text-base text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-purple-500/10 group hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="relative w-full h-56 bg-gradient-to-r from-purple-950/30 to-pink-950/30">
                <Image
                  src="/images/CHART4.jpg"
                  alt="Trading psychology"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-cyan-950/30 to-purple-950/30 border border-gray-800 p-10 text-center animate-fade-up animation-delay-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <p className="text-2xl font-bold text-white">
                "The markets are a reflection of human psychology."
              </p>
              <p className="mt-3 text-lg text-gray-400">Understanding yourself is the first step to understanding the markets.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-y border-gray-800 bg-gradient-to-b from-black to-gray-950 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-amber-500/20 bg-amber-500/5 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-amber-400 animate-float-subtle shadow-lg shadow-amber-500/10 hover:scale-105 transition-transform duration-300">
                <Rocket className="inline h-4 w-4 mr-2" />
                The trading process
              </p>
              <h2 className="mt-8 text-5xl font-extrabold tracking-tight animate-fade-up text-white sm:text-6xl">
                A simple cycle for <span className="text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text">continuous</span> improvement.
              </h2>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-4 animate-fade-up animation-delay-200">
              {[
                {
                  number: "01",
                  title: "Plan",
                  desc: "Define your strategies, rules, risk limits, and trading conditions before entry.",
                  color: "emerald"
                },
                {
                  number: "02",
                  title: "Trade",
                  desc: "Execute your trades while recording your decisions, setups, and emotions.",
                  color: "amber"
                },
                {
                  number: "03",
                  title: "Analyze",
                  desc: "Study your performance and identify patterns in your trading data.",
                  color: "purple"
                },
                {
                  number: "04",
                  title: "Improve",
                  desc: "Use insights to refine your approach and build better trading habits.",
                  color: "emerald"
                }
              ].map((step, i) => (
                <div key={i} className="group hover:pl-6 transition-all hover:scale-[1.05] duration-300 hover:shadow-2xl rounded-2xl p-6">
                  <div className="flex items-center gap-6">
                    <span className={`text-5xl font-extrabold text-${step.color}-400 group-hover:scale-110 transition-transform`}>
                      {step.number}
                    </span>
                    {i < 3 && (
                      <ArrowRight className="h-6 w-6 text-gray-700 group-hover:text-gray-500 transition-colors hidden md:block group-hover:translate-x-2 transition-transform" />
                    )}
                  </div>
                  <h3 className={`mt-6 text-2xl font-bold text-white transition-colors group-hover:text-${step.color}-400`}>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRADING STATS */}
        <section className="py-24 bg-gradient-to-r from-emerald-950/30 via-cyan-950/30 to-purple-950/30 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-600" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4 text-center animate-fade-up">
              {[
                { number: "100+", label: "Trades journaled daily", color: "emerald" },
                { number: "12", label: "Performance metrics", color: "amber" },
                { number: "87%", label: "User improvement rate", color: "purple" },
                { number: "5", label: "Strategy types supported", color: "rose" }
              ].map((stat, i) => (
                <div key={i} className="border-r border-gray-800 last:border-0 px-6 group hover:scale-110 transition-all duration-300">
                  <p className={`text-4xl font-extrabold text-${stat.color}-400 group-hover:scale-125 transition-transform`}>
                    {stat.number}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="pricing" className="border-t border-gray-800 bg-black py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="inline-block animate-float-subtle">
              <p className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 text-base font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
                <Zap className="h-5 w-5 text-amber-400" />
                Start with your data
                <Sparkles className="h-4 w-4 text-amber-400" />
              </p>
            </div>

            <h2 className="mt-10 text-5xl font-extrabold tracking-tight animate-fade-up text-white sm:text-6xl">
              Become a <span className="text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text">more informed</span> trader.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400 animate-fade-up animation-delay-200">
              Build your journal, study your performance, test your strategies, 
              and develop a trading process you can continuously improve.
            </p>

            <a
              href="/register"
              className="group mt-12 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-95 animate-fade-up animation-delay-300"
            >
              <Rocket className="h-5 w-5 animate-bounce-subtle" />
              Create your free account
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </a>

            <p className="mt-6 text-sm text-gray-600 animate-fade-up animation-delay-400">
              TradeLab is an analytical and educational platform. It does not execute trades or provide financial advice.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}