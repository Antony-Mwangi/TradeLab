// src/app/api/psychology/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import JournalModel from "@/models/Journal";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const trades = await JournalModel.find({ userId: session.user.email }).sort({ createdAt: 1 });

    const totalTrades = trades.length;

    if (totalTrades < 10) {
      return NextResponse.json({ insufficientData: true, totalTrades });
    }

    // 1. Emotional Performance breakdown
    const emotionMap: Record<string, { netR: number; count: number; wins: number }> = {};
    let rulesFollowedCount = 0;
    let riskRespectedCount = 0;
    let stopRespectedCount = 0;
    let planFollowedCount = 0;

    let fomoCount = 0;
    let fomoNetR = 0;
    let fomoWins = 0;

    let plannedCount = 0;
    let plannedNetR = 0;
    let plannedWins = 0;

    trades.forEach((t) => {
      // Use resultR if defined, otherwise fall back to parsing or calculating from pnl if needed
      const rVal = t.resultR ?? (t.pnl ? t.pnl / 100 : 0);

      // Emotions
      const emo = t.emotion || "Calm";
      if (!emotionMap[emo]) emotionMap[emo] = { netR: 0, count: 0, wins: 0 };
      emotionMap[emo].netR += rVal;
      emotionMap[emo].count += 1;
      if (rVal > 0) emotionMap[emo].wins += 1;

      // Discipline flags (defaulting to true if undefined)
      if (t.rulesFollowed ?? true) rulesFollowedCount++;
      if (t.riskRespected ?? true) riskRespectedCount++;
      if (t.stopRespected ?? true) stopRespectedCount++;
      if (t.planFollowed ?? true) planFollowedCount++;

      // FOMO vs Planned
      if (t.isFomo) {
        fomoCount++;
        fomoNetR += rVal;
        if (rVal > 0) fomoWins++;
      } else {
        plannedCount++;
        plannedNetR += rVal;
        if (rVal > 0) plannedWins++;
      }
    });

    const ruleAdherencePct = Math.round((rulesFollowedCount / totalTrades) * 100);
    const riskRespectedPct = Math.round((riskRespectedCount / totalTrades) * 100);
    const stopRespectedPct = Math.round((stopRespectedCount / totalTrades) * 100);
    const planFollowedPct = Math.round((planFollowedCount / totalTrades) * 100);

    // Compute Discipline Score (weighted average)
    const disciplineScore = Math.round(
      ruleAdherencePct * 0.3 + riskRespectedPct * 0.3 + stopRespectedPct * 0.2 + planFollowedPct * 0.2
    );

    const emotionalStabilityScore = Math.max(
      40,
      100 - (fomoCount / totalTrades) * 50 - ((emotionMap["Revenge"]?.count || 0) / totalTrades) * 50
    );

    return NextResponse.json({
      insufficientData: false,
      metrics: {
        disciplineScore,
        emotionalStability: Math.round(emotionalStabilityScore),
        ruleAdherence: ruleAdherencePct,
        psychologyTrend: "Improving",
      },
      emotionalPerformance: Object.entries(emotionMap).map(([emotion, data]) => ({
        emotion,
        netR: Number(data.netR.toFixed(2)),
        count: data.count,
        winRate: Math.round((data.wins / data.count) * 100),
      })),
      disciplineBreakdown: {
        planFollowed: planFollowedPct,
        riskRespected: riskRespectedPct,
        stopRespected: stopRespectedPct,
        ruleAdherence: ruleAdherencePct,
      },
      fomoComparison: {
        fomoTrades: fomoCount,
        fomoWinRate: fomoCount > 0 ? Math.round((fomoWins / fomoCount) * 100) : 0,
        fomoExpectancy: fomoCount > 0 ? Number((fomoNetR / fomoCount).toFixed(2)) : 0,
        plannedTrades: plannedCount,
        plannedWinRate: plannedCount > 0 ? Math.round((plannedWins / plannedCount) * 100) : 0,
        plannedExpectancy: plannedCount > 0 ? Number((plannedNetR / plannedCount).toFixed(2)) : 0,
      },
    });
  } catch (error) {
    console.error("Fetch psychology analytics error:", error);
    return NextResponse.json({ error: "Failed to load psychology insights" }, { status: 500 });
  }
}