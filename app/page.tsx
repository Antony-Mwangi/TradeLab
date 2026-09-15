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
  Zap,
  Activity,
  LineChart,
  AlertTriangle,
  Lightbulb,
  Award,
  Sparkles,
  Rocket,
  Flame,
  ChevronRight,
  Star,
  ArrowDown,
} from "lucide-react";

// ===== Section heading with green square + line (Safaricom style) =====
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {/* Green line */}
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500" />
      {/* Green square */}
      <div className="h-3 w-3 rounded-sm bg-emerald-500" />
      {/* Heading */}
      <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
        {/* ============================================
            HERO — Safaricom "myaccount" style
            Left: heading + description + green pill CTA
            Right: device mockup image
            ============================================ */}
        <section className="relative overflow-hidden border-b border-gray-800">
          <div className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-500/20 blur-3xl animate-float" />
          <div className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-emerald-500/15 blur-3xl animate-float animation-delay-600" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left — Text */}
              <div className="animate-fade-up">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Get More Done With{" "}
                  <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                    TradeLab
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400 sm:text-xl">
                  Check your trading performance, journal every trade, analyze
                  your results, and build better habits to ensure you have the
                  data you need for consistent growth.
                </p>

                {/* Green pill CTA — Safaricom style */}
                <a
                  href="/register"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-emerald-600 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-95"
                >
                  Start trading better
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                {/* "Find Out Why ↓" style link */}
                <div className="mt-6">
                  <a
                    href="#discover"
                    className="inline-flex items-center gap-2 text-lg font-semibold text-emerald-400 hover:text-emerald-300 transition group"
                  >
                    Find Out Why
                    <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                  </a>
                </div>
              </div>

              {/* Right — Device mockup image */}
              <div className="relative animate-fade-up animation-delay-200">
                <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-emerald-500/10 group hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02]">
                  <div className="relative w-full h-80 lg:h-[480px]">
                    <Image
                      src="/images/CHART1.jpg"
                      alt="Trading charts and analysis"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-20 grid gap-4 sm:grid-cols-3">
              {[
                { value: "95%", label: "of traders fail to journal", color: "emerald" },
                { value: "3.2x", label: "better performance with review", color: "amber" },
                { value: "67%", label: "improvement in consistency", color: "purple" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border border-${stat.color}-500/20 bg-gradient-to-b from-${stat.color}-950/30 to-black/50 p-6 text-center shadow-lg hover:shadow-${stat.color}-500/20 hover:scale-105 transition-all duration-300 group`}
                >
                  <p className={`text-3xl font-extrabold text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            DISCOVER — "Discover Safaricom World" style
            2-column cards with image on right
            ============================================ */}
        <section
          id="discover"
          className="border-b border-gray-800 bg-gradient-to-b from-black to-gray-950 py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading>Discover TradeLab World</SectionHeading>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {/* Card 1 */}
              <div className="group rounded-2xl border border-gray-800 bg-gray-900/40 p-8 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      Track everything
                    </h3>
                    <p className="mt-3 text-base text-gray-400 leading-relaxed">
                      Every trade, setup, emotion, and outcome creates your
                      trading history.
                    </p>
                  </div>
                  <Activity className="h-10 w-10 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl border border-gray-800 bg-gray-900/40 p-8 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      Identify patterns
                    </h3>
                    <p className="mt-3 text-base text-gray-400 leading-relaxed">
                      Find what works, what doesn't, and what you're
                      unconsciously repeating.
                    </p>
                  </div>
                  <LineChart className="h-10 w-10 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl border border-gray-800 bg-gray-900/40 p-8 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      Build consistency
                    </h3>
                    <p className="mt-3 text-base text-gray-400 leading-relaxed">
                      Data reveals your strengths and exposes areas needing
                      discipline.
                    </p>
                  </div>
                  <Award className="h-10 w-10 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="group rounded-2xl border border-gray-800 bg-gray-900/40 p-8 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      Measure your edge
                    </h3>
                    <p className="mt-3 text-base text-gray-400 leading-relaxed">
                      Trading without tracking is like navigating without a
                      map. Every trade is a data point waiting to be analyzed.
                    </p>
                  </div>
                  <Target className="h-10 w-10 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            "Experience more on TradeLab World"
            2x2 feature grid with icons + titles + descriptions
            ============================================ */}
        <section id="features" className="bg-black py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading>Experience more on TradeLab World</SectionHeading>

            <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
              {[
                {
                  icon: NotebookPen,
                  title: "Trading Journal",
                  desc: "Keep a structured record of your trades, setups, entry reasons, emotions, screenshots, and post-trade observations.",
                  color: "emerald",
                },
                {
                  icon: BarChart3,
                  title: "Performance Analytics",
                  desc: "Study your results through performance metrics, equity curves, drawdown, win rate, expectancy, and risk-adjusted returns.",
                  color: "blue",
                },
                {
                  icon: FlaskConical,
                  title: "Strategy Backtesting",
                  desc: "Test trading ideas against historical market data and evaluate their performance before committing real capital.",
                  color: "amber",
                },
                {
                  icon: Brain,
                  title: "Trading Psychology",
                  desc: "Track emotions, discipline, and behavioral patterns to understand how psychology influences every trading decision.",
                  color: "purple",
                },
                {
                  icon: Target,
                  title: "Trading Plans",
                  desc: "Define your trading rules, setups, risk limits, and conditions before you enter the market.",
                  color: "rose",
                },
                {
                  icon: ShieldCheck,
                  title: "Risk Management",
                  desc: "Monitor your risk exposure, drawdown, and consistency to develop stronger risk-management habits.",
                  color: "teal",
                },
              ].map((feature, i) => (
                <div key={i} className="group">
                  {/* Icon + Title on same row */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-${feature.color}-500/10 text-${feature.color}-400 border border-${feature.color}-500/20 transition-all group-hover:scale-110`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-emerald-400">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description below */}
                  <p className="mt-4 text-base text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            Two-column image + text (Safaricom "Manage Account" style)
            ============================================ */}
        <section className="border-y border-gray-800 bg-gradient-to-b from-black to-gray-950 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Row 1 — Text left, Image right */}
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionHeading>Find out what is actually working.</SectionHeading>
                <p className="mt-6 text-lg leading-relaxed text-gray-400">
                  Instead of relying on memory, use your trading history to
                  understand your performance across different strategies,
                  markets, sessions, and conditions.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "Analyze performance by strategy and setup",
                    "Compare different markets and trading sessions",
                    "Track risk, drawdown, and consistency",
                    "Identify patterns that are difficult to see manually",
                    "Measure your edge and confidence intervals",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 group">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <p className="text-sm text-gray-400 group-hover:text-white transition-colors font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-emerald-500/10 group hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02]">
                <div className="relative w-full h-80 lg:h-[400px]">
                  <Image
                    src="/images/CHART2.jpg"
                    alt="Analysis charts"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Row 2 — Image left, Text right */}
            <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-purple-500/10 group hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] order-2 lg:order-1">
                <div className="relative w-full h-80 lg:h-[400px]">
                  <Image
                    src="/images/CHART3.jpg"
                    alt="Psychology"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <SectionHeading>
                  Your strategy is only part of the equation.
                </SectionHeading>
                <p className="mt-6 text-lg leading-relaxed text-gray-400">
                  Your decisions are influenced by confidence, fear,
                  impatience, FOMO, and other emotions. Track them to identify
                  recurring patterns.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: Brain,
                      title: "Track emotions",
                      desc: "Record how you felt before and after each trade to identify emotional triggers.",
                      color: "purple",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Review decisions",
                      desc: "Compare what you planned to do with what you actually did in the moment.",
                      color: "amber",
                    },
                    {
                      icon: Lightbulb,
                      title: "Build discipline",
                      desc: "Use your history to recognize behaviors you want to improve and reinforce.",
                      color: "emerald",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20 transition-all group-hover:scale-110`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            HOW IT WORKS — Numbered process cards
            ============================================ */}
        <section
          id="how-it-works"
          className="bg-black py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading>A simple cycle for continuous improvement.</SectionHeading>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Plan",
                  desc: "Define your strategies, rules, risk limits, and trading conditions before entry.",
                  color: "emerald",
                },
                {
                  number: "02",
                  title: "Trade",
                  desc: "Execute your trades while recording your decisions, setups, and emotions.",
                  color: "amber",
                },
                {
                  number: "03",
                  title: "Analyze",
                  desc: "Study your performance and identify patterns in your trading data.",
                  color: "purple",
                },
                {
                  number: "04",
                  title: "Improve",
                  desc: "Use insights to refine your approach and build better trading habits.",
                  color: "emerald",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-gray-800 bg-gray-900/40 p-6 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.03]"
                >
                  <span className={`text-5xl font-extrabold text-${step.color}-400/50 group-hover:text-${step.color}-400 transition-colors`}>
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            TESTIMONIALS — Safaricom "What Our Trusted Users Say" style
            Light background banner + 3 clean white cards
            ============================================ */}
        <section className="relative bg-gray-100 py-20 text-gray-900">
          {/* Top banner strip — like Safaricom's gray banner */}
          <div className="absolute left-0 right-0 top-32 mx-auto h-24 max-w-4xl bg-gray-200/80" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-2xl font-light uppercase tracking-[0.3em] text-emerald-500">
                Testimonials
              </p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                What Our Trusted Users Say
              </h2>
            </div>

            <div className="mt-20 grid gap-8 md:grid-cols-3">
              {[
                {
                  quote:
                    "Tracking my trades has completely changed how I approach the markets. I can finally see what's actually working.",
                  author: "Anonymous",
                },
                {
                  quote:
                    "The psychology section helps me catch patterns I never noticed before. I've become a much more disciplined trader.",
                  author: "Anonymous",
                },
                {
                  quote:
                    "Backtesting my strategies before risking real money has been a game-changer. I finally trust my edge.",
                  author: "Anonymous",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className="h-5 w-5 text-emerald-500 fill-emerald-500"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base text-gray-700 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <p className="mt-6 text-sm font-bold text-gray-900">
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            TRADING STATS BAR
            ============================================ */}
        <section className="bg-black py-16 border-y border-gray-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-4 text-center">
              {[
                { number: "100+", label: "Trades journaled daily", color: "emerald" },
                { number: "12", label: "Performance metrics", color: "amber" },
                { number: "87%", label: "User improvement rate", color: "purple" },
                { number: "5", label: "Strategy types supported", color: "rose" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="border-r border-gray-800 last:border-0 px-4 group hover:scale-110 transition-all duration-300"
                >
                  <p className={`text-4xl font-extrabold text-${stat.color}-400 group-hover:scale-125 transition-transform`}>
                    {stat.number}
                  </p>
                  <p className="mt-2 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            FINAL CTA
            ============================================ */}
        <section id="pricing" className="bg-black py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Become a{" "}
              <span className="text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text">
                more informed
              </span>{" "}
              trader.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
              Build your journal, study your performance, test your strategies,
              and develop a trading process you can continuously improve.
            </p>

            <a
              href="/register"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-emerald-600 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-95"
            >
              <Rocket className="h-4 w-4" />
              Create your free account
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </a>

            <p className="mt-6 text-xs text-gray-600">
              TradeLab is an analytical and educational platform. It does not
              execute trades or provide financial advice.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}