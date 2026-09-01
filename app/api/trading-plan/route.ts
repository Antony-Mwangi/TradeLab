// src/app/api/trading-plan/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import TradingPlanModel from "@/models/TradingPlan";
import JournalModel from "@/models/Journal";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const plan = await TradingPlanModel.findOne({ userId: session.user.email });

    // Calculate actual rule adherence from journal if plan exists
    let ruleAdherence = 0;
    if (plan) {
      const trades = await JournalModel.find({ userId: session.user.email });
      if (trades.length > 0) {
        const followedCount = trades.filter((t) => t.planFollowed ?? true).length;
        ruleAdherence = Math.round((followedCount / trades.length) * 100);
      }
    }

    return NextResponse.json({ plan, ruleAdherence });
  } catch (error) {
    console.error("Fetch trading plan error:", error);
    return NextResponse.json({ error: "Failed to load trading plan" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    let plan = await TradingPlanModel.findOne({ userId: session.user.email });

    if (plan) {
      // Update existing
      plan.markets = body.markets || plan.markets;
      plan.instruments = body.instruments || plan.instruments;
      plan.preferredSessions = body.preferredSessions || plan.preferredSessions;
      plan.tradingHours = body.tradingHours || plan.tradingHours;
      plan.strategies = body.strategies || plan.strategies;
      plan.riskManagement = body.riskManagement || plan.riskManagement;
      plan.entryRules = body.entryRules || plan.entryRules;
      plan.exitRules = body.exitRules || plan.exitRules;
      plan.psychologyRules = body.psychologyRules || plan.psychologyRules;
      plan.noTradeConditions = body.noTradeConditions || plan.noTradeConditions;
      plan.dailyRoutine = body.dailyRoutine || plan.dailyRoutine;
      plan.lastReviewed = new Date();
      await plan.save();
    } else {
      // Create new
      plan = await TradingPlanModel.create({
        userId: session.user.email,
        ...body,
        lastReviewed: new Date(),
      });
    }

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error("Save trading plan error:", error);
    return NextResponse.json({ error: "Failed to save trading plan" }, { status: 500 });
  }
}