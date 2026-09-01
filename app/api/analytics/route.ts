// src/app/api/analytics/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import JournalModel from "@/models/Journal";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const userEmail = session.user.email;
    const userId = (session.user as any).id;

    // Flexible query to catch records stored by userId (ID or Email) or fallback email field
    const trades = await JournalModel.find({
      $or: [
        ...(userId ? [{ userId: userId }] : []),
        { userId: userEmail },
        { email: userEmail },
      ],
    }).sort({ createdAt: 1 });

    const totalTrades = trades.length;
    if (totalTrades === 0) {
      return NextResponse.json({
        totalTrades: 0,
        winRate: 0,
        netPnl: 0,
        profitFactor: 0,
        expectancy: "0.00",
        avgWin: "+$0.00",
        avgLoss: "-$0.00",
        bestTrade: 0,
        worstTrade: 0,
        equityCurve: [],
        setupPerformance: [],
        sessionPerformance: [],
        psychologyPerformance: [],
        riskAnalysis: { avgRisk: "1.0%", maxDd: "$0.00", lossStreak: 0 },
        insights: ["Start logging trades to generate performance insights."],
      });
    }

    let winningTrades = 0;
    let losingTrades = 0;
    let netPnl = 0;
    let totalWinPnl = 0;
    let totalLossPnl = 0;
    let maxDrawdown = 0;
    let peakPnl = 0;
    let currentLossStreak = 0;
    let maxLossStreak = 0;

    const equityCurve: { date: string; pnl: number }[] = [];
    let cumulativePnl = 0;

    const setupMap: { [key: string]: { wins: number; total: number; pnl: number } } = {};
    const sessionMap: { [key: string]: number } = {};
    const emotionMap: { [key: string]: number } = {};

    trades.forEach((trade) => {
      const pnl = trade.pnl || 0;
      netPnl += pnl;
      cumulativePnl += pnl;

      if (cumulativePnl > peakPnl) peakPnl = cumulativePnl;
      const drawdown = peakPnl - cumulativePnl;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;

      equityCurve.push({
        date: new Date(trade.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        pnl: cumulativePnl,
      });

      if (pnl > 0) {
        winningTrades++;
        totalWinPnl += pnl;
        currentLossStreak = 0;
      } else if (pnl < 0) {
        losingTrades++;
        totalLossPnl += Math.abs(pnl);
        currentLossStreak++;
        if (currentLossStreak > maxLossStreak) maxLossStreak = currentLossStreak;
      }

      const setup = trade.setup || "General Execution";
      if (!setupMap[setup]) setupMap[setup] = { wins: 0, total: 0, pnl: 0 };
      setupMap[setup].total += 1;
      setupMap[setup].pnl += pnl;
      if (pnl > 0) setupMap[setup].wins += 1;

      const marketSession = trade.session || "New York";
      sessionMap[marketSession] = (sessionMap[marketSession] || 0) + pnl;

      const emotion = trade.emotion || "Calm";
      emotionMap[emotion] = (emotionMap[emotion] || 0) + pnl;
    });

    const winRate = Number(((winningTrades / totalTrades) * 100).toFixed(1));
    const profitFactor = totalLossPnl === 0 ? totalWinPnl : Number((totalWinPnl / totalLossPnl).toFixed(2));
    const avgWin = winningTrades > 0 ? (totalWinPnl / winningTrades).toFixed(2) : "0";
    const avgLoss = losingTrades > 0 ? (totalLossPnl / losingTrades).toFixed(2) : "0";
    const expectancy = (netPnl / totalTrades).toFixed(2);

    const setupPerformance = Object.keys(setupMap).map((key) => ({
      setup: key,
      trades: setupMap[key].total,
      winRate: `${((setupMap[key].wins / setupMap[key].total) * 100).toFixed(1)}%`,
      pnl: setupMap[key].pnl,
    }));

    const sessionPerformance = Object.keys(sessionMap).map((key) => ({
      session: key,
      pnl: sessionMap[key],
    }));

    const psychologyPerformance = Object.keys(emotionMap).map((key) => ({
      emotion: key,
      pnl: emotionMap[key],
    }));

    const insights: string[] = [];
    if (winRate >= 50) {
      insights.push(`✓ Your win rate is solid at ${winRate}%, keeping your performance on track.`);
    } else {
      insights.push(`! Your win rate is currently ${winRate}%. Consider re-evaluating entry triggers.`);
    }
    if (maxLossStreak >= 3) {
      insights.push(`! Watch out for tilt: your largest losing streak reached ${maxLossStreak} trades.`);
    }
    if (setupPerformance.length > 0) {
      const bestSetup = [...setupPerformance].sort((a, b) => b.pnl - a.pnl)[0];
      insights.push(`✓ Your top performing setup is "${bestSetup.setup}" with +$${bestSetup.pnl} net return.`);
    }

    return NextResponse.json({
      totalTrades,
      winningTrades,
      losingTrades,
      winRate,
      netPnl,
      profitFactor,
      expectancy: `${expectancy}`,
      avgWin: `+$${avgWin}`,
      avgLoss: `-$${avgLoss}`,
      bestTrade: Math.max(...trades.map((t) => t.pnl || 0), 0),
      worstTrade: Math.min(...trades.map((t) => t.pnl || 0), 0),
      equityCurve,
      setupPerformance,
      sessionPerformance,
      psychologyPerformance,
      riskAnalysis: {
        avgRisk: "1.0%",
        maxDd: `-$${maxDrawdown.toFixed(2)}`,
        lossStreak: maxLossStreak,
      },
      insights,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to compute analytics" }, { status: 500 });
  }
}