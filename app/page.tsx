// app/page.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  ArrowRight,
  ArrowDown,
  BarChart3,
  Brain,
  CheckCircle2,
  FlaskConical,
  NotebookPen,
  ShieldCheck,
  Target,
  Activity,
  LineChart,
  AlertTriangle,
  Lightbulb,
  Award,
  Sparkles,
  Rocket,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ============================================
// INTERSECTION OBSERVER HOOK
// ============================================
function useReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ============================================
// REVEAL WRAPPER
// ============================================
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// COUNT UP NUMBER
// ============================================
function CountUp({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const { ref, visible } = useReveal();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(end);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

// ============================================
// MARQUEE
// ============================================
function Marquee({
  items,
  speed = 40,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex overflow-hidden border-y border-white/[0.06] bg-zinc-950 py-4 ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="flex shrink-0 items-center gap-12 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600"
          >
            {item}
          </span>
        ))}
      </div>
      <div
        className="flex shrink-0 items-center gap-12 whitespace-nowrap will-change-transform"
        style={{ animation: `marquee ${speed}s linear infinite` }}
        aria-hidden
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SECTION HEADING
// ============================================
function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-zinc-400 leading-relaxed sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

// ============================================
// BROWSER FRAME (for product screenshots)
// ============================================
function BrowserFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-950 shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-[1.01]">
      {/* Browser top bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
        </div>
        <div className="ml-3 flex-1 rounded-md bg-white/[0.03] px-3 py-1 text-[10px] text-zinc-600 font-mono">
          tradelab.com/dashboard
        </div>
      </div>
      {/* Image */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

// ============================================
// TESTIMONIAL CAROUSEL
// ============================================
function TestimonialCarousel() {
  const testimonials = [
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
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-64 sm:h-56">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-700"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "translateX(0)" : "translateX(20px)",
              pointerEvents: active === i ? "auto" : "none",
            }}
          >
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, s) => (
                <Star
                  key={s}
                  className="h-4 w-4 text-emerald-400 fill-emerald-400"
                />
              ))}
            </div>
            <p className="max-w-2xl text-lg sm:text-xl text-zinc-300 leading-relaxed">
              "{t.quote}"
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              — {t.author}
            </p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition-all hover:border-white/[0.16] hover:text-white"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-8 bg-emerald-400" : "w-1.5 bg-zinc-700"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => (a + 1) % testimonials.length)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition-all hover:border-white/[0.16] hover:text-white"
          aria-label="Next testimonial"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ============================================
// HOW IT WORKS TIMELINE
// ============================================
function HowItWorksTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      number: "01",
      title: "Plan",
      desc: "Define your strategies, rules, risk limits, and trading conditions before entry.",
    },
    {
      number: "02",
      title: "Trade",
      desc: "Execute your trades while recording your decisions, setups, and emotions.",
    },
    {
      number: "03",
      title: "Analyze",
      desc: "Study your performance and identify patterns in your trading data.",
    },
    {
      number: "04",
      title: "Improve",
      desc: "Use insights to refine your approach and build better trading habits.",
    },
  ];

  // Auto-advance active step
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Desktop horizontal timeline */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between gap-4">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-6 h-px bg-white/[0.06]" />
          <div
            className="absolute left-0 top-6 h-px bg-emerald-400 transition-all duration-700"
            style={{
              width: `${(activeStep / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            return (
              <div
                key={i}
                className="relative flex flex-1 flex-col items-center text-center"
              >
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? "border-emerald-400 bg-emerald-500/10 text-emerald-400"
                      : isPast
                      ? "border-emerald-400/40 bg-zinc-950 text-emerald-400/60"
                      : "border-white/[0.08] bg-zinc-950 text-zinc-600"
                  }`}
                >
                  <span className="font-mono text-xs font-bold">
                    {step.number}
                  </span>
                </div>
                <h3
                  className={`mt-5 text-lg font-bold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed transition-colors duration-300 max-w-xs ${
                    isActive ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          return (
            <div
              key={i}
              className={`flex gap-5 rounded-lg border p-5 transition-all duration-500 ${
                isActive
                  ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                  : "border-white/[0.06] bg-white/[0.01]"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all ${
                  isActive
                    ? "border-emerald-400 bg-emerald-500/10 text-emerald-400"
                    : "border-white/[0.08] text-zinc-600"
                }`}
              >
                {step.number}
              </div>
              <div>
                <h3
                  className={`text-base font-bold ${
                    isActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased overflow-x-hidden">
      <Header />

      <main>
        {/* ============================================
            HERO
            ============================================ */}
        <section className="relative overflow-hidden">
          {/* Very subtle background accent */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-500/[0.04] blur-3xl" />
            <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              {/* Left — Text */}
              <Reveal>
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    TradeLab Analytics Platform
                  </span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05]">
                  Get More Done With{" "}
                  <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                    TradeLab
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">
                  Check your trading performance, journal every trade, analyze
                  your results, and build better habits to ensure you have the
                  data you need for consistent growth.
                </p>

                {/* CTAs */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/register"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] active:scale-95"
                  >
                    Start Trading Better
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <a
                    href="#discover"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    Find Out Why
                    <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </a>
                </div>
              </Reveal>

              {/* Right — Product screenshot */}
              <Reveal delay={150}>
                <BrowserFrame
                  src="/images/CHART1.png"
                  alt="TradeLab dashboard"
                  priority
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================
            STATS STRIP
            ============================================ */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { value: 95, suffix: "%", label: "of traders fail to journal" },
                { value: 3.2, suffix: "x", label: "better performance with review" },
                { value: 67, suffix: "%", label: "improvement in consistency" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="py-10 px-6">
                    <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      {Number.isInteger(stat.value) ? (
                        <>
                          <CountUp end={stat.value} />
                          {stat.suffix}
                        </>
                      ) : (
                        <>{stat.value}{stat.suffix}</>
                      )}
                    </p>
                    <p className="mt-3 text-sm text-zinc-500">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            MARQUEE 1 — FEATURES
            ============================================ */}
        <Marquee
          items={[
            "Trading Journal",
            "Performance Analytics",
            "Strategy Backtesting",
            "Trading Psychology",
            "Trading Plans",
            "Risk Management",
          ]}
          speed={50}
        />

        {/* ============================================
            DISCOVER — FEATURE BLOCKS
            ============================================ */}
        <section id="discover" className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="Discover TradeLab"
                title="A data-driven workspace for traders."
                description="Everything you need to document, measure, and improve your trading process — without any unnecessary noise."
              />
            </Reveal>

            <div className="mt-16 grid gap-12 md:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Track Everything",
                  desc: "Every trade, setup, emotion, and outcome creates your trading history.",
                },
                {
                  number: "02",
                  title: "Identify Patterns",
                  desc: "Find what works, what doesn't, and what you're unconsciously repeating.",
                },
                {
                  number: "03",
                  title: "Build Consistency",
                  desc: "Data reveals your strengths and exposes areas needing discipline.",
                },
                {
                  number: "04",
                  title: "Measure Your Edge",
                  desc: "Trading without tracking is like navigating without a map.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="group">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-zinc-600">
                        {item.number}
                      </span>
                      <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-emerald-400 sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-4 pl-9 text-base text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            FEATURES SHOWCASE
            ============================================ */}
        <section id="features" className="border-t border-white/[0.06] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="Experience more on TradeLab"
                title="Purpose-built tools for every part of your process."
              />
            </Reveal>

            {/* Primary feature */}
            <Reveal delay={100}>
              <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center rounded-2xl border border-white/[0.06] bg-white/[0.01] p-8 lg:p-12">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400">
                    <NotebookPen className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl sm:text-3xl font-semibold text-white">
                    Trading Journal
                  </h3>
                  <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                    Keep a structured record of your trades, setups, entry
                    reasons, emotions, screenshots, and post-trade observations.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden border border-white/[0.06]">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/images/CHART2.png"
                      alt="Trading journal"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Grid of remaining features */}
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: BarChart3,
                  title: "Performance Analytics",
                  desc: "Study your results through metrics, equity curves, drawdown, win rate, and expectancy.",
                },
                {
                  icon: FlaskConical,
                  title: "Strategy Backtesting",
                  desc: "Test trading ideas against historical data before committing real capital.",
                },
                {
                  icon: Brain,
                  title: "Trading Psychology",
                  desc: "Track emotions, discipline, and behavior to understand how psychology affects decisions.",
                },
                {
                  icon: Target,
                  title: "Trading Plans",
                  desc: "Define rules, setups, risk limits, and conditions before you enter the market.",
                },
                {
                  icon: ShieldCheck,
                  title: "Risk Management",
                  desc: "Monitor exposure, drawdown, and consistency to build stronger risk habits.",
                },
                {
                  icon: Activity,
                  title: "Trading Analytics",
                  desc: "Bring every metric into one clean view so you can act on real data.",
                },
              ].map((feature, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group flex flex-col gap-4 rounded-lg border border-white/[0.06] bg-white/[0.01] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.02]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-zinc-400 transition-colors group-hover:text-emerald-400">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            MARQUEE 2 — ANALYTICS
            ============================================ */}
        <Marquee
          items={[
            "Win Rate",
            "Expectancy",
            "Drawdown",
            "Risk/Reward",
            "Profit Factor",
            "Equity Curve",
            "Consistency",
          ]}
          speed={55}
        />

        {/* ============================================
            ANALYTICS SECTION
            ============================================ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <SectionHeading
                  eyebrow="Performance Analytics"
                  title="Find out what is actually working."
                  description="Instead of relying on memory, use your trading history to understand your performance across different strategies, markets, sessions, and conditions."
                />

                <div className="mt-8 space-y-3">
                  {[
                    "Analyze performance by strategy and setup",
                    "Compare markets and trading sessions",
                    "Track risk, drawdown, and consistency",
                    "Identify patterns",
                    "Measure your edge",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 group">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400 transition-transform group-hover:scale-110" />
                      <p className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={150}>
                <BrowserFrame
                  src="/images/CHART3.png"
                  alt="Analytics dashboard"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================
            PSYCHOLOGY SECTION
            ============================================ */}
        <section className="border-t border-white/[0.06] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <Reveal className="order-2 lg:order-1">
                <BrowserFrame
                  src="/images/CHART3.png"
                  alt="Psychology tracking"
                />
              </Reveal>

              <Reveal delay={150} className="order-1 lg:order-2">
                <SectionHeading
                  eyebrow="Trading Psychology"
                  title="Your strategy is only part of the equation."
                  description="Your decisions are influenced by confidence, fear, impatience, FOMO, and other emotions. Track them to identify recurring patterns."
                />

                <div className="mt-8 space-y-5">
                  {[
                    {
                      icon: Brain,
                      title: "Track Emotions",
                      desc: "Record how you felt before and after each trade.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Review Decisions",
                      desc: "Compare what you planned to do with what you actually did.",
                    },
                    {
                      icon: Lightbulb,
                      title: "Build Discipline",
                      desc: "Recognize behaviors and reinforce better habits.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-zinc-400 transition-colors group-hover:text-emerald-400">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================
            HOW IT WORKS
            ============================================ */}
        <section id="how-it-works" className="border-t border-white/[0.06] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="How It Works"
                title="A simple cycle for continuous improvement."
                className="text-center"
              />
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-16">
                <HowItWorksTimeline />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================
            TESTIMONIALS
            ============================================ */}
        <section className="border-t border-white/[0.06] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-4">
                  Testimonials
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  What Our Users Say
                </h2>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <TestimonialCarousel />
            </Reveal>
          </div>
        </section>

        {/* ============================================
            MARQUEE 3 — SOCIAL PROOF
            ============================================ */}
        <Marquee
          items={[
            "100+ Trades Journaled Daily",
            "12 Performance Metrics",
            "87% User Improvement",
            "5 Strategy Types Supported",
          ]}
          speed={45}
        />

        {/* ============================================
            FINAL CTA
            ============================================ */}
        <section id="pricing" className="py-28 relative overflow-hidden">
          {/* Very subtle background grid */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse at center, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Become a{" "}
                <span className="text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text">
                  more informed
                </span>{" "}
                trader.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
                Build your journal, study your performance, test your
                strategies, and develop a trading process you can continuously
                improve.
              </p>

              <Link
                href="/register"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] active:scale-95"
              >
                Create Your Free Account
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <p className="mt-8 text-xs text-zinc-600">
                TradeLab is an analytical and educational platform. It does not
                execute trades or provide financial advice.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}