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
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main>
        {/* HERO - Bright Background */}
        <section className="relative overflow-hidden">
          {/* Animated gradient orbs - light version */}
          <div className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-200/40 via-cyan-200/30 to-emerald-200/40 blur-3xl animate-float" />
          <div className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-amber-200/30 via-pink-200/20 to-purple-200/30 blur-3xl animate-float animation-delay-600" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-emerald-100/40 to-cyan-100/40 blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />

          <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-4xl text-center">
              {/* Animated badge - light */}
              <div className="inline-block animate-float-subtle">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-gradient-to-r from-emerald-100/80 to-cyan-100/80 px-4 py-2 text-sm text-emerald-700 backdrop-blur-sm shadow-md shadow-emerald-200/30">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  Your trading performance workspace
                  <Sparkles className="h-3 w-3 text-amber-500" />
                </div>
              </div>

              {/* Animated heading */}
              <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight animate-fade-up text-gray-900 sm:text-6xl lg:text-7xl">
                Turn your trading data into
                <span className="block bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-text">
                  actionable insights.
                </span>
              </h1>

              {/* Animated paragraph */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 animate-fade-up animation-delay-200">
                Journal every trade, analyze your performance, backtest strategies,
                and understand the psychology behind your decisions.
              </p>

              {/* Animated CTA buttons */}
              <div className="mt-9 flex flex-col justify-center gap-4 animate-fade-up animation-delay-300 sm:flex-row">
                <a
                  href="/register"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-300/50 active:scale-95"
                >
                  <Rocket className="h-4 w-4" />
                  <span>Start trading better</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
                </a>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:border-gray-400 active:scale-95 backdrop-blur-sm"
                >
                  <Flame className="h-4 w-4 mr-2 text-amber-500" />
                  Explore features
                </a>
              </div>

              {/* Trading stats - light version */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 animate-fade-up animation-delay-400">
                <div className="text-center bg-gradient-to-b from-emerald-50 to-white px-6 py-3 rounded-xl border border-emerald-200 shadow-sm">
                  <p className="text-2xl font-bold text-emerald-600">95%</p>
                  <p className="text-xs text-gray-500">of traders fail to journal</p>
                </div>
                <div className="text-center bg-gradient-to-b from-amber-50 to-white px-6 py-3 rounded-xl border border-amber-200 shadow-sm">
                  <p className="text-2xl font-bold text-amber-600">3.2x</p>
                  <p className="text-xs text-gray-500">better performance with review</p>
                </div>
                <div className="text-center bg-gradient-to-b from-purple-50 to-white px-6 py-3 rounded-xl border border-purple-200 shadow-sm">
                  <p className="text-2xl font-bold text-purple-600">67%</p>
                  <p className="text-xs text-gray-500">improvement in consistency</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY TRADING DATA MATTERS - Bright */}
        <section className="border-y border-gray-200 bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-amber-300/50 bg-gradient-to-r from-amber-100/80 to-orange-100/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700 animate-float-subtle shadow-sm shadow-amber-200/30">
                <Sparkles className="inline h-3 w-3 mr-1" />
                The data-driven trader
              </p>
              <h2 className="mt-6 text-4xl font-bold tracking-tight animate-fade-up text-gray-900 sm:text-5xl">
                What gets measured gets <span className="text-emerald-600">improved.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 animate-fade-up animation-delay-200">
                Trading without tracking is like navigating without a map. 
                Every trade is a data point waiting to be analyzed.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3 animate-fade-up animation-delay-300">
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
                <div key={i} className={`border-l-2 border-${item.color}-300 pl-6 py-2 hover:border-${item.color}-500 transition-all hover:bg-${item.color}-50 rounded-r-lg`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-500 mb-3`} />
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES - Bright */}
        <section id="features" className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-emerald-300/50 bg-gradient-to-r from-emerald-100/80 to-cyan-100/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-emerald-700 animate-float-subtle shadow-sm shadow-emerald-200/30">
                <Zap className="inline h-3 w-3 mr-1 text-amber-500" />
                Built around your process
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight animate-fade-up text-gray-900 sm:text-5xl">
                Everything you need to <span className="text-emerald-600">study</span> your trading.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 animate-fade-up animation-delay-200">
                TradeLab provides the tools to document, measure, test, and improve 
                your trading process—without executing trades for you.
              </p>
            </div>

            <div className="mt-16 space-y-8 animate-fade-up animation-delay-300">
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
                },
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
                  className="group flex items-start gap-6 border-b border-gray-200 pb-8 hover:border-transparent transition-all hover:pl-4 hover:bg-gradient-to-r hover:from-gray-50 to-transparent rounded-r-lg"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${feature.color}-100 text-${feature.color}-600 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold text-gray-800 transition-colors group-hover:text-${feature.color}-600`}>
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-2xl">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ANALYSIS SECTION - Bright */}
        <section className="border-y border-gray-200 bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="inline-block rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-100/80 to-emerald-100/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-cyan-700 animate-float-subtle shadow-sm shadow-cyan-200/30">
                  <LineChart className="inline h-3 w-3 mr-1" />
                  Turn data into insight
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight animate-fade-up text-gray-900 sm:text-5xl">
                  Find out what is actually <span className="text-cyan-600">working.</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600 animate-fade-up animation-delay-200">
                  Instead of relying on memory, use your trading history to understand 
                  your performance across different strategies, markets, sessions, and conditions.
                </p>

                <div className="mt-8 space-y-4 animate-fade-up animation-delay-300">
                  {[
                    "Analyze performance by strategy and setup",
                    "Compare different markets and trading sessions",
                    "Track risk, drawdown, and consistency",
                    "Identify patterns that are difficult to see manually",
                    "Measure your edge and confidence intervals"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 group hover:pl-2 transition-all">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 group-hover:scale-110 transition-transform group-hover:text-cyan-500" />
                      <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 animate-fade-up animation-delay-400">
                <div className="border-l-2 border-cyan-300 pl-6 py-4 hover:border-cyan-500 transition-all hover:bg-cyan-50 rounded-r-lg">
                  <p className="text-sm font-semibold text-cyan-600">Strategy Performance</p>
                  <p className="mt-1 text-sm text-gray-600">Compare the historical results of your different trading setups and refine what works.</p>
                </div>
                <div className="border-l-2 border-purple-300 pl-6 py-4 hover:border-purple-500 transition-all hover:bg-purple-50 rounded-r-lg">
                  <p className="text-sm font-semibold text-purple-600">Behavioral Patterns</p>
                  <p className="mt-1 text-sm text-gray-600">Understand the relationship between your emotions, decisions, and trading results.</p>
                </div>
                <div className="border-l-2 border-amber-300 pl-6 py-4 hover:border-amber-500 transition-all hover:bg-amber-50 rounded-r-lg">
                  <p className="text-sm font-semibold text-amber-600">Risk Analysis</p>
                  <p className="mt-1 text-sm text-gray-600">Review how your risk-taking behavior affects your overall trading performance.</p>
                </div>
                <div className="border-l-2 border-emerald-300 pl-6 py-4 hover:border-emerald-500 transition-all hover:bg-emerald-50 rounded-r-lg">
                  <p className="text-sm font-semibold text-emerald-600">Edge Measurement</p>
                  <p className="mt-1 text-sm text-gray-600">Calculate your real edge and confidence intervals to trade with conviction.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PSYCHOLOGY SECTION - Bright */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-purple-300/50 bg-gradient-to-r from-purple-100/80 to-pink-100/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-purple-700 animate-float-subtle shadow-sm shadow-purple-200/30">
                <Brain className="inline h-3 w-3 mr-1" />
                Trading psychology
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight animate-fade-up text-gray-900 sm:text-5xl">
                Your strategy is only <span className="text-purple-600">part</span> of the equation.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 animate-fade-up animation-delay-200">
                Your decisions are influenced by confidence, fear, impatience, FOMO, 
                and other emotions. Track them to identify recurring patterns.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3 animate-fade-up animation-delay-300">
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
                <div key={i} className={`border-t-2 border-${item.color}-200 pt-6 hover:border-${item.color}-400 transition-all hover:bg-${item.color}-50 rounded-lg p-4`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-500 mb-3`} />
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-50 via-cyan-50 to-purple-50 border border-gray-200 p-8 text-center animate-fade-up animation-delay-400 shadow-sm">
              <p className="text-lg font-medium text-gray-800">
                "The markets are a reflection of human psychology."
              </p>
              <p className="mt-2 text-sm text-gray-600">Understanding yourself is the first step to understanding the markets.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Bright */}
        <section id="how-it-works" className="border-y border-gray-200 bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-block rounded-full border border-amber-300/50 bg-gradient-to-r from-amber-100/80 to-orange-100/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700 animate-float-subtle shadow-sm shadow-amber-200/30">
                <Rocket className="inline h-3 w-3 mr-1" />
                The trading process
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight animate-fade-up text-gray-900 sm:text-5xl">
                A simple cycle for <span className="text-amber-600">continuous</span> improvement.
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
                <div key={i} className="group hover:pl-4 transition-all">
                  <div className="flex items-center gap-4">
                    <span className={`text-4xl font-bold text-${step.color}-600 group-hover:scale-110 transition-transform`}>
                      {step.number}
                    </span>
                    {i < 3 && (
                      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors hidden md:block" />
                    )}
                  </div>
                  <h3 className={`mt-4 text-xl font-semibold text-gray-800 transition-colors group-hover:text-${step.color}-600`}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRADING STATS - Bright */}
        <section className="py-20 bg-gradient-to-r from-emerald-50 via-cyan-50 to-purple-50">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4 text-center animate-fade-up">
              {[
                { number: "100+", label: "Trades journaled daily", color: "emerald" },
                { number: "12", label: "Performance metrics", color: "amber" },
                { number: "87%", label: "User improvement rate", color: "purple" },
                { number: "5", label: "Strategy types supported", color: "rose" }
              ].map((stat, i) => (
                <div key={i} className="border-r border-gray-200 last:border-0 px-4">
                  <p className={`text-3xl font-bold text-${stat.color}-600`}>
                    {stat.number}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Bright */}
        <section id="pricing" className="border-t border-gray-200 bg-white py-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="inline-block animate-float-subtle">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-gradient-to-r from-emerald-100/80 to-cyan-100/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-emerald-700 backdrop-blur-sm shadow-sm shadow-emerald-200/30">
                <Zap className="h-4 w-4 text-amber-500" />
                Start with your data
                <Sparkles className="h-3 w-3 text-amber-500" />
              </p>
            </div>

            <h2 className="mt-6 text-4xl font-bold tracking-tight animate-fade-up text-gray-900 sm:text-5xl">
              Become a <span className="text-transparent bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text">more informed</span> trader.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 animate-fade-up animation-delay-200">
              Build your journal, study your performance, test your strategies, 
              and develop a trading process you can continuously improve.
            </p>

            <a
              href="/register"
              className="group mt-9 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-300/50 active:scale-95 animate-fade-up animation-delay-300"
            >
              <Rocket className="h-4 w-4" />
              Create your free account
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <p className="mt-5 text-xs text-gray-500 animate-fade-up animation-delay-400">
              TradeLab is an analytical and educational platform. It does not execute trades or provide financial advice.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}