"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ArrowRight, Shield, TrendingUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    /* Solid Pitch Black background matching the header profile exactly */
    <footer className="bg-black text-gray-400 text-sm border-t border-neutral-900 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl animate-float" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/5 blur-3xl animate-float animation-delay-600" />

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 relative">
        
        {/* Brand Profile */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-4">
            {/* ENLARGED, UNENCLOSED LOGO WRAPPER MATCHING THE RE-STYLED HEADER */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <Image 
                src="/images/LOGO.png" 
                alt="TradeLab Logo" 
                fill
                className="object-contain bg-transparent drop-shadow-xl"
                priority
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
                Trade<span className="text-emerald-400">Lab</span>
              </span>
              <span className="text-[11px] tracking-[0.4em] uppercase text-emerald-500 font-black mt-1.5 leading-none">
                Analytics
              </span>
            </div>
          </div>
          
          <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm max-w-sm transition-colors duration-300 hover:text-gray-300">
            A trading performance platform designed to help traders
            understand their data, develop better habits, test strategies
            and improve their decision-making process.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400/90 font-bold">
            <Shield size={14} className="text-emerald-500" />
            <span>Educational & Analytical Platform</span>
          </div>
        </div>

        {/* Platform Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-emerald-500 font-black text-xs uppercase tracking-widest">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Features", path: "#features" },
              { label: "How It Works", path: "#how-it-works" },
              { label: "Pricing", path: "#pricing" }
            ].map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="hover:text-emerald-400 font-medium transition-colors flex items-center gap-1.5 group text-gray-400">
                  <ArrowRight size={12} className="text-neutral-800 group-hover:text-emerald-500 transition-colors" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-emerald-500 font-black text-xs uppercase tracking-widest">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Trading Education", path: "/education" },
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Service", path: "/terms" }
            ].map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="hover:text-emerald-400 font-medium transition-colors flex items-center gap-1.5 group text-gray-400">
                  <ArrowRight size={12} className="text-neutral-800 group-hover:text-emerald-500 transition-colors" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Base copyright layer completely flattened to pure black */}
      <div className="border-t border-neutral-900 bg-black py-6 px-4 text-center text-xs text-gray-500 font-semibold uppercase tracking-wider flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
        <span>© {currentYear} TradeLab. All Rights Reserved.</span>
        <span className="hidden sm:inline text-neutral-800">|</span>
        <span>Built with Premium Standards.</span>
        <span className="hidden sm:inline text-neutral-800">|</span>
        <span className="text-emerald-500/60">Analytical & Educational Platform</span>
      </div>

      {/* Decorative gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-pulse-slow" />
    </footer>
  );
}