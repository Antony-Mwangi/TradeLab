import Link from "next/link";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080b12]">
      {/* Animated gradient orbs */}
      <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl animate-float" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/5 blur-3xl animate-float animation-delay-600" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30 group-hover:scale-110">
                <TrendingUp className="h-5 w-5 text-black transition-transform duration-300 group-hover:rotate-12" />
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                Trade<span className="text-emerald-400">Lab</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-gray-400 transition-colors duration-300 hover:text-gray-300">
              A trading performance platform designed to help traders
              understand their data, develop better habits, test strategies
              and improve their decision-making process.
            </p>

            <p className="mt-5 text-xs leading-5 text-gray-600">
              TradeLab provides analytical, educational and journaling tools.
              It does not execute trades or provide financial advice.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white">Platform</h3>

            <ul className="mt-5 space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
              ].map((item, index) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-all duration-300 hover:text-white hover:translate-x-1"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>

            <ul className="mt-5 space-y-3">
              {[
                { label: "Trading Education", href: "/education" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item, index) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-all duration-300 hover:text-white hover:translate-x-1"
                    style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with animations */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p className="transition-colors duration-300 hover:text-gray-400">
            © {currentYear} TradeLab. All rights reserved.
          </p>

          <p className="transition-colors duration-300 hover:text-gray-400">
            For educational and analytical purposes only.
          </p>
        </div>

        {/* Decorative gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-pulse-slow" />
      </div>
    </footer>
  );
}