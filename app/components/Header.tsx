"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full shadow-2xl">
      {/* TOP INFO BAR - Optional, you can remove if not needed */}
      <div className={`bg-black text-gray-300 text-xs sm:text-sm py-2.5 px-4 border-b border-neutral-900 transition-all duration-300 ${
        scrolled ? "hidden" : ""
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium">TradeLab Analytics Platform</span>
            </div>
          </div>
          <div className="text-emerald-400 font-bold tracking-widest text-[10px] uppercase sm:block hidden">
            Data-Driven Trading
          </div>
        </div>
      </div>

      {/* CORE NAVIGATION (Dark Theme) */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? "bg-black/95 backdrop-blur-lg border-b border-neutral-900/50" 
          : "bg-black border-b border-neutral-900"
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-28 flex justify-between items-center">
          
          {/* Brand Logo - Overlapping Style (Like KEGO) */}
          <Link href="/" className="flex items-center justify-center group h-full select-none z-10">
            {/* LARGE OVERLAPPING LOGO WRAPPER */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 -my-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/images/LOGO.png" 
                alt="TradeLab Logo" 
                fill
                priority
                className="object-contain bg-transparent drop-shadow-xl"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wider uppercase">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="transition-colors py-2 relative tracking-widest text-gray-300 hover:text-emerald-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-gray-300 hover:text-white font-medium text-sm transition-colors duration-300"
            >
              Sign in
            </Link>
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 group"
            >
              Get Started
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 text-gray-400 hover:text-white md:hidden transition-colors focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={28} className="text-emerald-400" /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Flyout (Dark Theme) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-neutral-900 px-4 pt-2 pb-6 space-y-3 absolute top-full left-0 w-full shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Logo */}
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-neutral-900">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image 
                  src="/images/LOGO.png" 
                  alt="TradeLab Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Trade<span className="text-emerald-400">Lab</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
                    Available
                  </span>
                </div>
              </div>
            </div>

            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md font-bold text-sm tracking-wide uppercase text-gray-300 hover:bg-neutral-900 hover:text-emerald-400 transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <span className="flex items-center gap-3">
                  <span className="text-emerald-400/40 font-mono text-xs">0{index + 1}</span>
                  {link.label}
                </span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            
            <div className="pt-4 px-1 border-t border-neutral-900 mt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-3.5 rounded-md text-center block text-xs uppercase tracking-widest shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}