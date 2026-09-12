// components/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  LineChart,
  LogOut,
  Settings,
  Target,
  TrendingUp,
  Sparkles,
  Home,
  User,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLink {
  href: string;
  label: string;
  icon: any;
  badge?: string;
}

export default function DashboardSidebar({
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  // Trading tools (primary)
  const primaryNav: NavLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/journal", label: "Trading Journal", icon: BookOpen },
    { href: "/analytics", label: "Analytics", icon: LineChart },
    { href: "/backtesting", label: "Backtesting", icon: TrendingUp },
    { href: "/psychology", label: "Trading Psychology", icon: Brain },
    { href: "/trading-plan", label: "Trading Plan", icon: Target },
    { href: "/calendar", label: "Trading Calendar", icon: CalendarDays },
    { href: "/ai", label: "AI Analyst", icon: Sparkles, badge: "NEW" },
  ];

  // Public pages (secondary)
  const secondaryNav: NavLink[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog & Articles", icon: BookOpen },
    { href: "/education", label: "Education", icon: TrendingUp },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 group"
            onClick={onClose}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md transition-all group-hover:scale-110">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Trade<span className="text-emerald-400">Lab</span>
            </span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* Primary Section */}
          <div>
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Trading Tools
            </p>
            <div className="space-y-1">
              {primaryNav.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition group ${
                      active
                        ? "bg-emerald-500/10 text-emerald-400 font-medium"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={19}
                      className="shrink-0 transition-transform group-hover:scale-110"
                    />
                    <span className="flex-1">{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        {link.badge}
                      </span>
                    )}
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Explore
            </p>
            <div className="space-y-1">
              {secondaryNav.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition group ${
                      active
                        ? "bg-emerald-500/10 text-emerald-400 font-medium"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={19}
                      className="shrink-0 transition-transform group-hover:scale-110"
                    />
                    <span className="flex-1">{link.label}</span>
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 p-4 space-y-1">
          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              isActive("/profile")
                ? "bg-emerald-500/10 text-emerald-400 font-medium"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <User size={19} />
            Profile
          </Link>

          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              isActive("/settings")
                ? "bg-emerald-500/10 text-emerald-400 font-medium"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <Settings size={19} />
            Settings
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}