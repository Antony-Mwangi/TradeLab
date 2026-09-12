// components/DashboardHeader.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, Bell, Search, Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);

  const userName = session?.user?.name || "Trader";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Search (desktop) */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="hidden md:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 transition hover:border-slate-700 hover:text-white"
        >
          <Search size={16} />
          <span>Search...</span>
          <kbd className="ml-8 rounded border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-[10px] text-slate-500">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-3">
        {/* AI Quick Access */}
        <Link
          href="/ai"
          className="hidden sm:flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/5 px-3 py-2 text-xs font-semibold text-purple-400 transition hover:bg-purple-500/10 hover:border-purple-500/30"
        >
          <Sparkles size={14} />
          <span>AI</span>
        </Link>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User Info */}
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-white">{userName}</p>
          <p className="text-xs text-slate-500">{session?.user?.email}</p>
        </div>

        {/* Avatar */}
        <Link
          href="/profile"
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 transition hover:border-emerald-500/50 hover:scale-105"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={userName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-emerald-400">
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}