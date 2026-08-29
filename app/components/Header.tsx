"use client";

import Link from "next/link";
import { Menu, TrendingUp, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-gray-200/50 border-gray-200/50"
          : "bg-white/80 backdrop-blur border-gray-200/30"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo with animation */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-200/50 group-hover:scale-110">
            <TrendingUp className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12" />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Trade<span className="text-emerald-600">Lab</span>
          </span>
        </Link>

        {/* Desktop Navigation with animated links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative text-sm text-gray-600 transition-colors duration-300 hover:text-emerald-600"
            >
              {link.label}
              {/* Animated underline */}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions with animations */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-gray-600 transition-all duration-300 hover:text-emerald-600 hover:scale-105"
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-200/50 active:scale-95"
          >
            <span className="relative z-10">Get Started</span>
            {/* Button shimmer effect */}
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
          </Link>
        </div>

        {/* Mobile Menu Button with animation */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative rounded-lg p-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:scale-110 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 animate-fade-in" />
          ) : (
            <Menu className="h-6 w-6 animate-fade-in" />
          )}
        </button>
      </div>

      {/* Mobile Navigation with slide animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-200/50 bg-white">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between border-b border-gray-100 py-4 text-sm text-gray-600 transition-all duration-300 hover:text-emerald-600 hover:pl-2"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {link.label}
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/0 transition-all duration-300 group-hover:bg-emerald-400/50" />
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 text-sm text-gray-600 transition-all duration-300 hover:text-emerald-600 hover:pl-2"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-200/50 active:scale-95"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}