// app/blog/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  BookOpen,
  TrendingUp,
  ArrowLeft,
  Clock,
  Tag,
  Bookmark,
  Link2,
  CheckCircle2,
  ChevronRight,
  User,
  AlertCircle,
  Info,
  Lightbulb,
  Target,
  Zap,
  BarChart3,
  TrendingDown,
  Award,
  Shield,
  Flame,
  Sparkles,
  Eye,
  Brain,
  DollarSign,
  Percent,
  LineChart,
} from "lucide-react";

// ============================================
// INLINED SOCIAL ICONS
// ============================================
const XIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ============================================
// STRUCTURED POST DATA WITH RICH CONTENT
// ============================================
interface ContentBlock {
  type: "heading" | "paragraph" | "list" | "numbered" | "callout" | "table" | "comparison" | "quote" | "steps" | "chart";
  text?: string;
  variant?: "info" | "warning" | "success" | "tip" | "danger";
  items?: string[];
  numberedItems?: string[];
  headers?: string[];
  rows?: string[][];
  calloutTitle?: string;
  icon?: any;
  image?: string;
  imageAlt?: string;
  caption?: string;
}

interface PostContent {
  blocks: ContentBlock[];
}

const POST_CONTENTS: Record<string, PostContent> = {
  "risk-management-ultimate-guide": {
    blocks: [
      {
        type: "paragraph",
        text: "Risk management is the single most important skill that separates successful traders from those who blow up their accounts. In this comprehensive guide, we'll explore the key principles that professional traders use to protect their capital.",
      },
      {
        type: "chart",
        image: "/images/eurusd.jpg",
        imageAlt: "EUR/USD chart showing price action",
        caption: "Proper risk management keeps you in the game through drawdowns",
      },
      { type: "heading", text: "The 1% Rule" },
      {
        type: "paragraph",
        text: "The foundation of any solid risk management strategy is the 1% rule. This means you should never risk more than 1% of your total account balance on a single trade.",
      },
      {
        type: "table",
        headers: ["Account Size", "1% Risk Amount", "Max Daily Loss (2%)", "Weekly Limit (5%)"],
        rows: [
          ["$1,000", "$10", "$20", "$50"],
          ["$5,000", "$50", "$100", "$250"],
          ["$10,000", "$100", "$200", "$500"],
          ["$50,000", "$500", "$1,000", "$2,500"],
          ["$100,000", "$1,000", "$2,000", "$5,000"],
        ],
      },
      { type: "heading", text: "Why 1%?" },
      {
        type: "list",
        items: [
          "Survivability — Even with 10 consecutive losses, you'd only lose ~10% of your account",
          "Emotional Control — Smaller losses are easier to handle psychologically",
          "Recovery Speed — Small losses require small gains to recover",
        ],
      },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "Example Calculation",
        text: "If your account is $10,000 and you risk 1%, that's $100 maximum loss per trade. If your stop-loss is 50 pips, your position size should be calculated accordingly.",
      },
      { type: "heading", text: "Position Sizing Formula" },
      {
        type: "callout",
        variant: "info",
        calloutTitle: "The Formula",
        text: "Position Size = (Account Balance × Risk %) ÷ (Entry - Stop Loss)",
      },
      {
        type: "paragraph",
        text: "This ensures that regardless of where you place your stop, you're always risking the same amount.",
      },
      { type: "heading", text: "Stop-Loss Placement" },
      {
        type: "paragraph",
        text: "Your stop-loss should be placed based on market structure, not arbitrary pip amounts. Common approaches include:",
      },
      {
        type: "numbered",
        numberedItems: [
          "Beyond recent swing highs/lows",
          "Beyond support/resistance levels",
          "Based on ATR (Average True Range)",
          "Time-based stops for intraday trades",
        ],
      },
      { type: "heading", text: "Risk-Reward Ratios" },
      {
        type: "paragraph",
        text: "A healthy risk-reward ratio is 1:2 or better. This means for every dollar you risk, you're targeting at least two dollars of profit.",
      },
      {
        type: "table",
        headers: ["R:R Ratio", "Break-Even Win Rate", "Profit at 50% WR", "Risk Level"],
        rows: [
          ["1:1", "50%", "Break even", "High"],
          ["1:1.5", "40%", "+10%", "Medium"],
          ["1:2", "33%", "+20%", "Low"],
          ["1:3", "25%", "+25%", "Very Low"],
          ["1:4", "20%", "+30%", "Excellent"],
        ],
      },
      { type: "heading", text: "Common Mistakes" },
      {
        type: "callout",
        variant: "danger",
        calloutTitle: "Avoid These Pitfalls",
        text: "Moving your stop-loss to avoid losses, revenge trading after a loss, increasing position size after a losing streak, and trading without a stop-loss.",
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Risk management isn't glamorous, but it's what keeps you in the game long enough to develop a profitable edge. Master these principles, and you'll be ahead of 90% of retail traders.",
      },
    ],
  },

  "trading-psychology-fear-greed": {
    blocks: [
      {
        type: "paragraph",
        text: "Fear and greed are the two most powerful emotions in trading. They drive markets, influence decisions, and can destroy accounts in minutes if left unchecked.",
      },
      {
        type: "chart",
        image: "/images/us30.jpg",
        imageAlt: "US30 chart",
        caption: "Emotional trading creates predictable patterns",
      },
      { type: "heading", text: "What Is Fear in Trading?" },
      {
        type: "list",
        items: [
          "Fear of losing — Leading to premature exits",
          "Fear of missing out (FOMO) — Chasing trades that have already moved",
          "Fear of being wrong — Refusing to accept a loss",
          "Fear of success — Self-sabotaging when things go well",
        ],
      },
      { type: "heading", text: "What Is Greed in Trading?" },
      {
        type: "list",
        items: [
          "Oversizing positions — Risking too much on a 'sure thing'",
          "Moving take-profit targets — Always wanting more",
          "Ignoring risk rules — 'Just this once'",
          "Adding to losers — Hoping for a reversal",
        ],
      },
      { type: "heading", text: "The Emotional Cycle" },
      {
        type: "table",
        headers: ["Stage", "Emotion", "Typical Behavior", "Danger Level"],
        rows: [
          ["1", "Optimism", "Excited, learning", "Low"],
          ["2", "Excitement", "Small wins, more confidence", "Low"],
          ["3", "Thrill", "Winning feels easy", "Medium"],
          ["4", "Anxiety", "First significant loss", "Medium"],
          ["5", "Denial", "'It will come back'", "High"],
          ["6", "Fear", "Panic trading", "Very High"],
          ["7", "Desperation", "Chasing losses", "Extreme"],
          ["8", "Capitulation", "Giving up", "Extreme"],
          ["9", "Hope", "Trying again", "High"],
        ],
      },
      { type: "heading", text: "Building Emotional Discipline" },
      {
        type: "steps",
        items: [
          "Pre-Defined Rules — Write down entry, exit, position size, and max daily loss before the session",
          "Journal Every Trade — Log your emotional state before, during, and after each trade",
          "Physical Reset — Step away, walk, breathe, and come back with a clear head",
          "Review Weekly — Analyze your emotional patterns weekly for triggers",
        ],
      },
      { type: "heading", text: "The Mindset Shift" },
      {
        type: "comparison",
        headers: ["Amateur Mindset", "Professional Mindset"],
        rows: [
          ["Tries to predict the market", "Focuses on managing risk"],
          ["Reacts to price movement", "Executes their process"],
          ["Chases winning streaks", "Sticks to their rules"],
          ["Emotional decisions", "Systematic decisions"],
        ],
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Mastering fear and greed isn't about eliminating emotions — it's about recognizing them and following your process anyway.",
      },
    ],
  },

  "eurusd-weekly-analysis": {
    blocks: [
      {
        type: "paragraph",
        text: "EUR/USD closed the week at 1.0875, up 0.45% from the previous week's close. The pair continues to trade within a broader consolidation range as markets await the upcoming FOMC meeting.",
      },
      {
        type: "chart",
        image: "/images/eurusd.jpg",
        imageAlt: "EUR/USD weekly chart",
        caption: "EUR/USD consolidating between key levels",
      },
      { type: "heading", text: "Key Levels to Watch" },
      {
        type: "table",
        headers: ["Type", "Level", "Significance", "Distance"],
        rows: [
          ["Resistance", "1.1050", "200-day MA", "+1.6%"],
          ["Resistance", "1.1000", "Round number", "+1.2%"],
          ["Resistance", "1.0950", "Weekly resistance", "+0.7%"],
          ["Current", "1.0875", "Weekly close", "—"],
          ["Support", "1.0820", "Recent swing low", "-0.5%"],
          ["Support", "1.0780", "Monthly support", "-0.9%"],
          ["Support", "1.0720", "Yearly low", "-1.4%"],
        ],
      },
      { type: "heading", text: "Technical Analysis" },
      {
        type: "callout",
        variant: "info",
        calloutTitle: "Daily Chart Structure",
        text: "Higher lows forming since mid-August. Bollinger Bands squeezing, suggesting a breakout is approaching. RSI hovering around 52, neutral territory.",
      },
      {
        type: "callout",
        variant: "info",
        calloutTitle: "4-Hour Chart Setup",
        text: "Potential ascending triangle forming. Price compressing between 1.0820 and 1.0950. Volume decreasing as the range tightens.",
      },
      { type: "heading", text: "Fundamental Drivers" },
      {
        type: "comparison",
        headers: ["USD Outlook", "EUR Outlook"],
        rows: [
          ["Fed remains data-dependent", "ECB maintaining current policy"],
          ["Employment data mixed", "German production weak"],
          ["CPI next week is key", "Eurozone inflation moderating"],
          ["Rate expectations shifting", "Growth concerns persist"],
        ],
      },
      { type: "heading", text: "Trade Scenarios" },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "Bullish Case",
        text: "Break above 1.0950 → Target 1.1000, then 1.1050. Stop-loss below 1.0900. R:R 1:2 or better.",
      },
      {
        type: "callout",
        variant: "danger",
        calloutTitle: "Bearish Case",
        text: "Rejection at 1.0950 and break below 1.0820 → Target 1.0780, then 1.0720. Stop-loss above 1.0880. R:R 1:2.5.",
      },
      { type: "heading", text: "Key Events This Week" },
      {
        type: "table",
        headers: ["Day", "Event", "Impact", "Time"],
        rows: [
          ["Tuesday", "Eurozone CPI (Flash)", "High", "10:00 GMT"],
          ["Wednesday", "US ADP Employment", "Medium", "13:15 GMT"],
          ["Thursday", "ECB Meeting Minutes", "Medium", "12:30 GMT"],
          ["Friday", "US Non-Farm Payrolls", "High", "13:30 GMT"],
        ],
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "EUR/USD remains in a consolidation phase with a slight downside bias given the strength of the USD. Wait for a confirmed break above 1.0950 or below 1.0820.",
      },
    ],
  },

  "candlestick-patterns-every-trader-should-know": {
    blocks: [
      {
        type: "paragraph",
        text: "Candlestick patterns are one of the most valuable tools in a trader's arsenal. They provide visual insights into market psychology and can signal potential reversals or continuations.",
      },
      {
        type: "chart",
        image: "/images/gbpjpy.jpg",
        imageAlt: "GBP/JPY candlestick chart",
        caption: "Candlestick patterns reveal market sentiment",
      },
      { type: "heading", text: "Top 10 Candlestick Patterns" },
      {
        type: "table",
        headers: ["#", "Pattern", "Type", "Reliability", "Best Location"],
        rows: [
          ["1", "Doji", "Indecision", "Medium", "Any"],
          ["2", "Hammer", "Bullish", "High", "Bottom"],
          ["3", "Inverted Hammer", "Bullish", "Medium", "Bottom"],
          ["4", "Shooting Star", "Bearish", "High", "Top"],
          ["5", "Bullish Engulfing", "Bullish", "Very High", "Support"],
          ["6", "Bearish Engulfing", "Bearish", "Very High", "Resistance"],
          ["7", "Morning Star", "Bullish", "Very High", "Bottom"],
          ["8", "Evening Star", "Bearish", "Very High", "Top"],
          ["9", "Three White Soldiers", "Bullish", "High", "Reversal"],
          ["10", "Three Black Crows", "Bearish", "High", "Reversal"],
        ],
      },
      { type: "heading", text: "Pattern Breakdown" },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "Doji",
        text: "A candle with a very small body and long wicks. Represents indecision. Wait for the next candle to confirm direction.",
      },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "Hammer",
        text: "Small body at the top with a long lower wick. Buyers rejected lower prices. Most reliable at the bottom of a downtrend with confirmation.",
      },
      {
        type: "callout",
        variant: "danger",
        calloutTitle: "Shooting Star",
        text: "Small body at the bottom with a long upper wick. Bullish momentum exhausted. Bearish reversal signal at resistance.",
      },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "Bullish Engulfing",
        text: "Small red candle followed by a larger green candle that completely engulfs it. One of the most reliable bullish reversal patterns.",
      },
      {
        type: "callout",
        variant: "danger",
        calloutTitle: "Bearish Engulfing",
        text: "Small green candle followed by a larger red candle that engulfs it. Strong bearish reversal signal, especially at resistance.",
      },
      { type: "heading", text: "Combining Patterns with Context" },
      {
        type: "list",
        items: [
          "Location — Is it at support or resistance?",
          "Trend — What's the higher timeframe doing?",
          "Volume — Is the pattern backed by volume?",
          "Confluence — Do other indicators confirm?",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        calloutTitle: "Pro Tip",
        text: "Never trade a candlestick pattern in isolation. Always combine it with market structure, trend, and confluence.",
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Mastering these 10 patterns will give you a solid foundation in price action trading. Practice identifying them on historical charts before applying them in live markets.",
      },
    ],
  },

  "federal-reserve-impact-currencies": {
    blocks: [
      {
        type: "paragraph",
        text: "The Federal Reserve is the most influential central bank in the world. Its decisions ripple through every financial market, especially currencies.",
      },
      {
        type: "chart",
        image: "/images/gbpusd.jpg",
        imageAlt: "GBP/USD chart",
        caption: "Currency reactions to Fed decisions",
      },
      { type: "heading", text: "The Federal Reserve's Mandate" },
      {
        type: "list",
        items: [
          "Maximum employment — Keep unemployment as low as possible",
          "Price stability — Maintain 2% inflation target",
        ],
      },
      { type: "heading", text: "How Interest Rates Affect Currencies" },
      {
        type: "comparison",
        headers: ["Fed Raises Rates", "Fed Cuts Rates"],
        rows: [
          ["USD becomes more attractive", "USD becomes less attractive"],
          ["Capital flows into US assets", "Capital flows out of US assets"],
          ["USD strengthens", "USD weakens"],
          ["Higher yields on bonds", "Lower yields on bonds"],
        ],
      },
      { type: "heading", text: "The FOMC Meeting Structure" },
      {
        type: "table",
        headers: ["Component", "Purpose", "Market Impact"],
        rows: [
          ["Statement", "Policy decision and reasoning", "High"],
          ["Dot Plot", "Members' rate projections", "Very High"],
          ["Press Conference", "Chair's Q&A session", "High"],
          ["Minutes", "Detailed discussion (3 weeks later)", "Medium"],
        ],
      },
      { type: "heading", text: "Reading the Fed's Signals" },
      {
        type: "callout",
        variant: "danger",
        calloutTitle: "Hawkish Signals (Bullish USD)",
        text: "'Inflation remains elevated', 'Further tightening may be needed', raising rate projections.",
      },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "Dovish Signals (Bearish USD)",
        text: "'Risks to growth', 'Patient approach', lowering rate projections.",
      },
      { type: "heading", text: "Historical Examples" },
      {
        type: "table",
        headers: ["Period", "Fed Action", "USD Reaction"],
        rows: [
          ["March 2020", "Emergency cut to near zero", "Initially strong, then weak"],
          ["2022-2023", "Raised 0.25% → 5.50%", "20-year highs"],
          ["2024", "Held rates high", "Strong with volatility"],
        ],
      },
      { type: "heading", text: "Trading the Fed" },
      {
        type: "steps",
        items: [
          "Before the Meeting — Reduce position size, avoid new directional trades",
          "During Announcement — Volatility spikes sharply, spreads widen",
          "After the Meeting — Wait for the initial spike, then look for direction",
        ],
      },
      { type: "heading", text: "Key Indicators to Watch" },
      {
        type: "table",
        headers: ["Indicator", "Full Name", "Release Frequency"],
        rows: [
          ["CPI", "Consumer Price Index", "Monthly"],
          ["NFP", "Non-Farm Payrolls", "Monthly"],
          ["PCE", "Personal Consumption Expenditures", "Monthly"],
          ["FOMC Minutes", "Fed Meeting Notes", "3 weeks after meeting"],
        ],
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Understanding the Fed is essential for forex traders. Follow the data, listen to the language, and always be prepared for volatility around FOMC meetings.",
      },
    ],
  },

  "how-i-improved-win-rate-40-percent": {
    blocks: [
      {
        type: "paragraph",
        text: "David Kimani is a retail forex trader based in Nairobi. When he first joined TradeLab, his win rate was 38% and his account was down 22% over 6 months. This is the story of how he turned it around.",
      },
      {
        type: "chart",
        image: "/images/nasdaq.jpg",
        imageAlt: "NASDAQ chart",
        caption: "From inconsistent losses to consistent profitability",
      },
      { type: "heading", text: "The Starting Point" },
      {
        type: "table",
        headers: ["Metric", "Before TradeLab", "After 6 Months", "Change"],
        rows: [
          ["Win Rate", "38%", "61%", "+23%"],
          ["Average R:R", "1:1.2", "1:2.3", "+1.1"],
          ["Traded Setup", "Random", "EMA Pullback", "Focused"],
          ["Psychology Score", "2.1/5", "4.3/5", "+2.2"],
          ["Journal Consistency", "40%", "98%", "+58%"],
          ["Account Growth", "-22%", "+34%", "+56%"],
        ],
      },
      { type: "heading", text: "Step 1 — Committing to Journaling" },
      {
        type: "paragraph",
        text: "The first change was simple: journal every single trade. No exceptions. David started logging entry/exit prices, stop-loss, take-profit, emotional state, reason for entry, and chart screenshots.",
      },
      {
        type: "callout",
        variant: "info",
        calloutTitle: "Pattern Discovered",
        text: "Within 3 weeks, patterns started emerging from the data.",
      },
      { type: "heading", text: "Step 2 — Identifying the Leaks" },
      {
        type: "table",
        headers: ["Issue Found", "Percentage", "Impact"],
        rows: [
          ["FOMO entries", "62% of losses", "Critical"],
          ["Failed breakouts", "82% of breakout trades", "High"],
          ["Moved stop-loss", "40% of losing trades", "Critical"],
        ],
      },
      { type: "heading", text: "Step 3 — Focusing on One Setup" },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "The Chosen Setup",
        text: "The pullback to the 20 EMA in a trending market. Backtested, paper traded, and refined over 4 weeks.",
      },
      { type: "heading", text: "Step 4 — Fixing Position Sizing" },
      {
        type: "comparison",
        headers: ["Before", "After"],
        rows: [
          ["Risking 3-5% per trade", "Strict 1% rule"],
          ["High emotional pressure", "Reduced stress"],
          ["Frequent blow-ups", "Survivable drawdowns"],
        ],
      },
      { type: "heading", text: "Step 5 — Psychology Work" },
      {
        type: "list",
        items: [
          "Meditating 10 minutes before each session",
          "Taking breaks after 2 consecutive losses",
          "Reviewing journal every Sunday",
        ],
      },
      { type: "heading", text: "What Made the Difference" },
      {
        type: "steps",
        items: [
          "Consistency — Journaling every single trade",
          "Data — Making decisions based on analytics, not feelings",
          "Focus — One setup, mastered",
          "Risk — Strict 1% rule",
          "Psychology — Building emotional discipline",
        ],
      },
      { type: "heading", text: "Final Thoughts" },
      {
        type: "paragraph",
        text: "David's journey shows that improvement is possible for any trader willing to do the work. It's not about finding a magic strategy — it's about consistently executing a good one.",
      },
    ],
  },

  "introducing-advanced-journal": {
    blocks: [
      {
        type: "paragraph",
        text: "Over the past few weeks, we've been hard at work rebuilding TradeLab's trading journal from the ground up. Today, we're excited to introduce the new Advanced Trade Journal.",
      },
      {
        type: "chart",
        image: "/images/us30.jpg",
        imageAlt: "Advanced journal preview",
        caption: "The new Advanced Trade Journal",
      },
      { type: "heading", text: "What's New" },
      {
        type: "table",
        headers: ["Category", "Fields Included"],
        rows: [
          ["Price Information", "Entry, Stop-Loss, Take-Profit, Exit Price"],
          ["Position Sizing", "Position Size, Risk %, Risk Amount, Account Balance"],
          ["Performance", "Net P&L, R-Multiple, Pips Captured"],
          ["Trade Context", "Setup, Strategy, Session, Market Structure, Confluence"],
          ["Psychology", "Emotion, Intensity, Discipline Checks, Mistakes, Lessons"],
        ],
      },
      { type: "heading", text: "Dual Chart Screenshots" },
      {
        type: "callout",
        variant: "info",
        calloutTitle: "Visual Review",
        text: "Upload before-entry and after-exit screenshots to visually review your setup and outcome side by side.",
      },
      { type: "heading", text: "Auto-Calculations" },
      {
        type: "list",
        items: [
          "Risk amount — from your risk % and account balance",
          "R-multiple — from entry, stop, and exit prices",
          "Visual risk-reward ratios — automatically displayed",
        ],
      },
      { type: "heading", text: "Organized Sections" },
      {
        type: "steps",
        items: [
          "Basic Information",
          "Price Information",
          "Position Sizing & Risk",
          "Performance",
          "Trade Context & Strategy",
          "Psychology & Discipline",
          "Screenshots & Notes",
        ],
      },
      { type: "heading", text: "Why We Built This" },
      {
        type: "paragraph",
        text: "Retail traders often fail because they don't have enough data to identify their real patterns. Entry and exit prices alone tell you almost nothing about why a trade succeeded or failed.",
      },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "What You Can Do Now",
        text: "Identify your most profitable setups, spot emotional patterns, track discipline over time, and measure your edge properly.",
      },
      { type: "heading", text: "Coming Next" },
      {
        type: "list",
        items: [
          "Advanced analytics dashboard with new charts",
          "Weekly review reports based on your journal data",
          "Setup comparison tool",
          "Psychology tracking over time",
        ],
      },
      { type: "heading", text: "Try It Now" },
      {
        type: "paragraph",
        text: "The new journal is live now. Head to /journal/new to record your next trade and explore all the new fields. We'd love to hear your feedback.",
      },
    ],
  },

  "gold-silver-outlook": {
    blocks: [
      {
        type: "paragraph",
        text: "Precious metals have been on a wild ride this year. Gold hit all-time highs above $2,400, while silver has been consolidating around $28-30.",
      },
      {
        type: "chart",
        image: "/images/xauusd.jpg",
        imageAlt: "XAU/USD gold chart",
        caption: "XAU/USD approaching all-time highs",
      },
      { type: "heading", text: "Gold Analysis" },
      {
        type: "table",
        headers: ["Metric", "Value", "Notes"],
        rows: [
          ["Spot Price", "~$2,380", "Current"],
          ["All-Time High", "$2,450", "Recent peak"],
          ["Key Support", "$2,300", "Major level"],
          ["Key Resistance", "$2,450", "ATH ceiling"],
        ],
      },
      { type: "heading", text: "Bullish Drivers" },
      {
        type: "list",
        items: [
          "Central bank buying at record pace",
          "Geopolitical tensions driving safe-haven demand",
          "Rate cut expectations for 2026",
          "Inflation uncertainty keeping demand strong",
        ],
      },
      { type: "heading", text: "Bearish Risks" },
      {
        type: "callout",
        variant: "warning",
        calloutTitle: "Watch Out For",
        text: "Strong USD pressuring metals, rate cuts already priced in, profit-taking at highs.",
      },
      { type: "heading", text: "Silver Analysis" },
      {
        type: "table",
        headers: ["Metric", "Value"],
        rows: [
          ["Spot Price", "~$29.50"],
          ["Key Support", "$27.80"],
          ["Key Resistance", "$31.00"],
          ["Gold-Silver Ratio", "80:1"],
          ["Historical Average", "65:1"],
        ],
      },
      {
        type: "callout",
        variant: "success",
        calloutTitle: "Silver Opportunity",
        text: "The current 80:1 ratio suggests silver may be undervalued compared to its historical 65:1 average.",
      },
      { type: "heading", text: "Trading Scenarios" },
      {
        type: "table",
        headers: ["Scenario", "Trigger", "Gold Target", "Silver Target"],
        rows: [
          ["Bullish", "DXY breaks below 104", "$2,500", "$33"],
          ["Bearish", "DXY breaks above 107", "$2,250", "$26"],
          ["Neutral", "DXY stays 104-107", "Range $2,300-2,450", "Range $27.80-31"],
        ],
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Precious metals remain in a bullish trend but are due for a healthy pullback. Buy dips near support, avoid chasing at resistance, and always respect your risk management rules.",
      },
    ],
  },

  "overcoming-revenge-trading": {
    blocks: [
      {
        type: "paragraph",
        text: "Revenge trading is the urge to immediately recover a loss by taking another (usually larger) trade. It's one of the fastest ways to blow up an account.",
      },
      {
        type: "chart",
        image: "/images/gbpjpy.jpg",
        imageAlt: "GBP/JPY volatility",
        caption: "Emotional volatility leads to account destruction",
      },
      { type: "heading", text: "The Psychology Behind It" },
      {
        type: "table",
        headers: ["Stage", "Emotion", "Typical Thought"],
        rows: [
          ["1", "Shock", "How did that happen?"],
          ["2", "Denial", "The market is wrong"],
          ["3", "Anger", "I'll show them"],
          ["4", "Desperation", "I need to make it back NOW"],
        ],
      },
      { type: "heading", text: "Why It Fails" },
      {
        type: "comparison",
        headers: ["Valid Trades", "Revenge Trades"],
        rows: [
          ["Analytical", "Emotional"],
          ["Normal size", "2-5x bigger"],
          ["Clear setup", "Poorly planned"],
          ["Focus on process", "Focus on recovery"],
        ],
      },
      { type: "heading", text: "Warning Signs" },
      {
        type: "list",
        items: [
          "Racing heart after a loss",
          "Rapid clicking on charts",
          "Justifying a trade that doesn't meet your rules",
          "Increasing position size to 'make it back quickly'",
          "Ignoring your stop-loss or moving it",
        ],
      },
      { type: "heading", text: "The 5-Step Recovery Protocol" },
      {
        type: "steps",
        items: [
          "Close the Platform — Walk away from the screen immediately",
          "Physical Reset — 15-30 minute break, walk, breathe, drink water",
          "Log the Loss — Write it in your journal, analyze what went wrong",
          "Daily Stop-Loss — Set 2% daily limit, no exceptions",
          "Return with Rules — Only trade A+ setups at reduced size",
        ],
      },
      { type: "heading", text: "Building Long-Term Resilience" },
      {
        type: "table",
        headers: ["Habit", "Frequency", "Purpose"],
        rows: [
          ["Journal Emotions", "Every trade", "Track patterns"],
          ["Set Loss Limits", "Daily/Weekly", "Prevent blow-ups"],
          ["Take Breaks", "After 2 losses", "Reset mindset"],
          ["Review Weekly", "Every Sunday", "Identify triggers"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        calloutTitle: "The Hard Truth",
        text: "Nobody makes money revenge trading. The traders who succeed are the ones who walk away when they feel the urge.",
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Revenge trading is an emotional response, not a strategy. It's fixable with the right protocol. Implement the 5-step recovery protocol today.",
      },
    ],
  },

  "discipline-over-prediction": {
    blocks: [
      {
        type: "paragraph",
        text: "Most new traders spend hours trying to predict where the market is going. They stare at charts, read news, and make educated guesses. And they're usually wrong.",
      },
      {
        type: "chart",
        image: "/images/eurusd.jpg",
        imageAlt: "EUR/USD chart",
        caption: "Markets are too complex to predict consistently",
      },
      { type: "heading", text: "Why Prediction Fails" },
      {
        type: "list",
        items: [
          "Thousands of traders with different strategies",
          "News events no one can predict",
          "Algorithmic trading",
          "Geopolitical events",
          "Central bank surprises",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        calloutTitle: "The Hard Truth",
        text: "No one can consistently predict the market. Not banks, not hedge funds, not 'gurus'.",
      },
      { type: "heading", text: "The Real Edge" },
      {
        type: "paragraph",
        text: "Professional traders don't focus on prediction. They focus on process.",
      },
      {
        type: "list",
        items: [
          "Has a defined edge (a strategy with positive expectancy)",
          "Executes that edge consistently",
          "Manages risk to survive losing streaks",
          "Reviews data to improve over time",
        ],
      },
      { type: "heading", text: "The Math Behind Discipline" },
      {
        type: "table",
        headers: ["Metric", "Value", "Notes"],
        rows: [
          ["Win Rate", "40%", "Strategy based"],
          ["Risk-Reward", "2:1", "Positive expectancy"],
          ["EV per Trade", "+0.2R", "Over many trades"],
          ["100 Trades", "+20R", "Consistent profit"],
        ],
      },
      { type: "heading", text: "When You Deviate" },
      {
        type: "table",
        headers: ["Action", "Impact", "Reasoning"],
        rows: [
          ["Skip 20 valid trades", "-4R", "Lost opportunities"],
          ["Take 20 'gut' trades", "-8R", "Untested setups"],
          ["Net Result", "-12R", "Instead of +20R"],
        ],
      },
      {
        type: "callout",
        variant: "danger",
        calloutTitle: "The Cost of Indiscipline",
        text: "The cost of discipline failure can be greater than the edge itself.",
      },
      { type: "heading", text: "How to Build Discipline" },
      {
        type: "steps",
        items: [
          "Write Down Your Rules — Physically post them near your screen",
          "Create a Pre-Trade Checklist — Verify every trade against your rules",
          "Track Discipline, Not Profits — Focus on process, not outcome",
          "Score Yourself Weekly — Rate your discipline 1-10 each week",
          "Accept the Outcome — You can only control your process",
        ],
      },
      { type: "heading", text: "The Long Game" },
      {
        type: "paragraph",
        text: "Trading is a marathon, not a sprint. The traders who make it 10 years from now are the ones who focus on process, manage risk, stay disciplined, and keep improving.",
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Stop trying to predict. Start focusing on discipline. Your edge is in the process, not the prediction. Execute your plan. Follow your rules. Journal your trades. The profits will follow.",
      },
    ],
  },
};

// ============================================
// POST METADATA BY SLUG
// ============================================
interface PostMeta {
  title: string;
  author: string;
  authorBio: string;
  authorAvatarColor: string;
  date: string;
  readTime: number;
  category: string;
  imageUrl: string;
  tags: string[];
}

const POSTS: Record<string, PostMeta> = {
  "risk-management-ultimate-guide": {
    title: "The Ultimate Guide to Risk Management in Forex Trading",
    author: "John Maina",
    authorBio: "Professional forex trader with 10+ years of experience in risk management.",
    authorAvatarColor: "from-emerald-500 to-cyan-500",
    date: "2026-09-08",
    readTime: 12,
    category: "Trading Tips & Strategies",
    imageUrl: "/images/eurusd.jpg",
    tags: ["Risk Management", "Position Sizing", "Stop Loss"],
  },
  "trading-psychology-fear-greed": {
    title: "Trading Psychology: Mastering Fear and Greed",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-09-05",
    readTime: 8,
    category: "Psychology Insights",
    imageUrl: "/images/us30.jpg",
    tags: ["Psychology", "Emotions", "Discipline"],
  },
  "eurusd-weekly-analysis": {
    title: "EUR/USD Weekly Analysis: Key Levels to Watch",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-09-04",
    readTime: 6,
    category: "Market Analysis",
    imageUrl: "/images/eurusd.jpg",
    tags: ["EUR/USD", "Market Analysis", "Forex"],
  },
  "candlestick-patterns-every-trader-should-know": {
    title: "10 Candlestick Patterns Every Trader Should Know",
    author: "John Maina",
    authorBio: "Professional forex trader with 10+ years of experience in risk management.",
    authorAvatarColor: "from-emerald-500 to-cyan-500",
    date: "2026-08-28",
    readTime: 15,
    category: "Trading Tips & Strategies",
    imageUrl: "/images/gbpjpy.jpg",
    tags: ["Technical Analysis", "Candlesticks", "Patterns"],
  },
  "federal-reserve-impact-currencies": {
    title: "How Federal Reserve Decisions Impact Currency Markets",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-08-25",
    readTime: 9,
    category: "Market Analysis",
    imageUrl: "/images/gbpusd.jpg",
    tags: ["Federal Reserve", "Interest Rates", "USD"],
  },
  "how-i-improved-win-rate-40-percent": {
    title: "Case Study: How I Improved My Win Rate by 40%",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-08-30",
    readTime: 10,
    category: "Case Studies",
    imageUrl: "/images/nasdaq.jpg",
    tags: ["Case Study", "Win Rate", "Improvement"],
  },
  "introducing-advanced-journal": {
    title: "Introducing: Advanced Trade Journal with 20+ Fields",
    author: "TradeLab Team",
    authorBio: "The team behind TradeLab.",
    authorAvatarColor: "from-amber-500 to-orange-500",
    date: "2026-09-02",
    readTime: 5,
    category: "Platform Updates",
    imageUrl: "/images/us30.jpg",
    tags: ["Product Update", "Journal", "Features"],
  },
  "gold-silver-outlook": {
    title: "Gold & Silver Outlook: Safe Haven Demand in Focus",
    author: "Raphael FX",
    authorBio: "Market analyst specializing in forex and indices with real-time market insights.",
    authorAvatarColor: "from-blue-500 to-cyan-500",
    date: "2026-08-18",
    readTime: 8,
    category: "Market Analysis",
    imageUrl: "/images/xauusd.jpg",
    tags: ["Gold", "Silver", "Commodities"],
  },
  "overcoming-revenge-trading": {
    title: "Overcoming Revenge Trading: A Practical Guide",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-08-22",
    readTime: 7,
    category: "Psychology Insights",
    imageUrl: "/images/gbpjpy.jpg",
    tags: ["Psychology", "Revenge Trading", "Discipline"],
  },
  "discipline-over-prediction": {
    title: "Discipline Over Prediction: Why Consistency Beats Being Right",
    author: "Pips Master",
    authorBio: "Trading psychology coach helping traders master the mental game.",
    authorAvatarColor: "from-purple-500 to-pink-500",
    date: "2026-08-15",
    readTime: 9,
    category: "Psychology Insights",
    imageUrl: "/images/eurusd.jpg",
    tags: ["Discipline", "Consistency", "Mindset"],
  },
};

// ============================================
// CONTENT RENDERERS
// ============================================
const calloutStyles = {
  info: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/30",
    text: "text-blue-300",
    title: "text-blue-400",
    Icon: Info,
  },
  success: {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    title: "text-emerald-400",
    Icon: CheckCircle2,
  },
  warning: {
    bg: "bg-amber-500/5",
    border: "border-amber-500/30",
    text: "text-amber-300",
    title: "text-amber-400",
    Icon: AlertCircle,
  },
  danger: {
    bg: "bg-red-500/5",
    border: "border-red-500/30",
    text: "text-red-300",
    title: "text-red-400",
    Icon: AlertCircle,
  },
  tip: {
    bg: "bg-purple-500/5",
    border: "border-purple-500/30",
    text: "text-purple-300",
    title: "text-purple-400",
    Icon: Lightbulb,
  },
};

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={index}
          className="mt-12 mb-5 text-2xl sm:text-3xl font-bold text-white animate-fade-up flex items-center gap-3"
        >
          <span className="h-1 w-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p
          key={index}
          className="my-4 text-base sm:text-lg text-slate-300 leading-relaxed animate-fade-up"
        >
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul
          key={index}
          className="my-4 space-y-2 animate-fade-up"
        >
          {block.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-300 leading-relaxed group hover:translate-x-1 transition-transform"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 group-hover:scale-150 transition-transform" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol key={index} className="my-4 space-y-3 animate-fade-up">
          {block.numberedItems?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-300 leading-relaxed group hover:translate-x-1 transition-transform"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-bold text-white group-hover:scale-110 transition-transform">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );

    case "callout": {
      const style = calloutStyles[block.variant || "info"];
      const Icon = style.Icon;
      return (
        <div
          key={index}
          className={`my-6 rounded-2xl border ${style.border} ${style.bg} p-5 sm:p-6 backdrop-blur-sm animate-fade-up hover:scale-[1.01] transition-transform`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.bg} border ${style.border}`}
            >
              <Icon className={`h-5 w-5 ${style.title}`} />
            </div>
            <div className="flex-1">
              {block.calloutTitle && (
                <h4 className={`mb-2 text-base font-bold ${style.title}`}>
                  {block.calloutTitle}
                </h4>
              )}
              <p className={`text-sm sm:text-base ${style.text} leading-relaxed`}>
                {block.text}
              </p>
            </div>
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div
          key={index}
          className="my-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 animate-fade-up"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-slate-900 to-slate-800/80 border-b border-slate-700">
                <tr>
                  {block.headers?.map((header, i) => (
                    <th
                      key={i}
                      className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-emerald-400 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows?.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-800/60 last:border-0 hover:bg-slate-800/30 transition-colors"
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-5 py-4 ${
                          j === 0
                            ? "font-semibold text-white"
                            : "text-slate-300"
                        } whitespace-nowrap`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "comparison":
      return (
        <div key={index} className="my-6 grid gap-4 sm:grid-cols-2 animate-fade-up">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 hover:scale-[1.02] transition-transform">
            <div className="mb-3 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-400">
                {block.headers?.[0]}
              </h4>
            </div>
            <ul className="space-y-2">
              {block.rows?.map((row, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-red-400 shrink-0" />
                  {row[0]}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 hover:scale-[1.02] transition-transform">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                {block.headers?.[1]}
              </h4>
            </div>
            <ul className="space-y-2">
              {block.rows?.map((row, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                  {row[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "steps":
      return (
        <div key={index} className="my-6 space-y-3 animate-fade-up">
          {block.items?.map((item, i) => {
            const [title, ...rest] = item.split(" — ");
            const description = rest.join(" — ");
            return (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all hover:scale-[1.01]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-bold text-white group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white mb-1">{title}</p>
                  {description && (
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "chart":
      return (
        <figure key={index} className="my-8 animate-fade-up">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 group hover:scale-[1.01] transition-transform">
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src={block.image || "/images/eurusd.jpg"}
                alt={block.imageAlt || "Chart"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-xs sm:text-sm text-slate-500 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function BlogPostPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const post: PostMeta =
    POSTS[slug] || POSTS["risk-management-ultimate-guide"];
  const content: PostContent =
    POST_CONTENTS[slug] || POST_CONTENTS["risk-management-ultimate-guide"];

  const authorInitials = post.author
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md transition-all group-hover:scale-110">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Trade<span className="text-emerald-400">Lab</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition">
              Home
            </Link>
            <Link href="/education" className="text-sm text-slate-400 hover:text-white transition">
              Education
            </Link>
            <Link href="/blog" className="text-sm font-medium text-emerald-400">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-300 hover:text-white transition">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <TrendingUp size={12} />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock size={12} />
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-slate-800 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${post.authorAvatarColor} text-sm font-bold text-white`}
                >
                  {authorInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{post.author}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="rounded-lg border border-slate-800 bg-slate-900/50 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition"
                  title="Copy link"
                >
                  {copied ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : (
                    <Link2 size={16} />
                  )}
                </button>
                <button className="rounded-lg border border-slate-800 bg-slate-900/50 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition" title="Share on X">
                  <XIcon size={16} />
                </button>
                <button className="rounded-lg border border-slate-800 bg-slate-900/50 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition" title="Share on Facebook">
                  <FacebookIcon size={16} />
                </button>
                <button className="rounded-lg border border-slate-800 bg-slate-900/50 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition" title="Share on LinkedIn">
                  <LinkedInIcon size={16} />
                </button>
                <button className="rounded-lg border border-slate-800 bg-slate-900/50 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition" title="Save">
                  <Bookmark size={16} />
                </button>
              </div>
            </div>

            {post.authorBio && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <User size={16} className="text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">
                    About {post.author}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {post.authorBio}
                  </p>
                </div>
              </div>
            )}
          </header>

          {post.imageUrl && (
            <div className="relative mb-8 h-64 sm:h-96 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-950/40 to-cyan-950/40 group">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}

          {/* Structured Content */}
          <div className="max-w-none">
            {content.blocks.map((block, i) => renderBlock(block, i))}
          </div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-6">
            <Tag size={14} className="text-slate-500" />
            {post.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-xs text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400 transition cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-16 border-t border-slate-800 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Related Articles</h2>
            <Link
              href="/blog"
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                slug: "trading-psychology-fear-greed",
                title: "Trading Psychology: Mastering Fear and Greed",
                category: "Psychology",
                readTime: 8,
                author: "Pips Master",
              },
              {
                slug: "candlestick-patterns-every-trader-should-know",
                title: "10 Candlestick Patterns Every Trader Should Know",
                category: "Tips",
                readTime: 15,
                author: "John Maina",
              },
              {
                slug: "eurusd-weekly-analysis",
                title: "EUR/USD Weekly Analysis: Key Levels to Watch",
                category: "Market Analysis",
                readTime: 6,
                author: "Raphael FX",
              },
            ].map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all hover:scale-[1.02]"
              >
                <span className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  {related.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition line-clamp-2 mb-2">
                  {related.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{related.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {related.readTime}m
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-slate-800 bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Want to Apply What You Learned?
          </h2>
          <p className="text-sm text-slate-400 mb-6 max-w-2xl mx-auto">
            Create a free TradeLab account to start journaling your trades and tracking your performance.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Create Free Account
            <ChevronRight size={16} />
          </Link>
        </section>
      </main>
    </div>
  );
}