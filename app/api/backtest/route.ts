// src/app/api/backtest/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import BacktestModel from "@/models/Backtest";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const userEmail = session.user.email;
    const userId = (session.user as any).id;

    const strategies = await BacktestModel.find({
      $or: [
        ...(userId ? [{ userId: userId }] : []),
        { userId: userEmail },
      ],
    }).sort({ createdAt: -1 });

    return NextResponse.json({ strategies });
  } catch (error) {
    console.error("Fetch backtests error:", error);
    return NextResponse.json({ error: "Failed to load backtests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const userId = (session.user as any).id || session.user.email;

    const newStrategy = await BacktestModel.create({
      userId,
      strategyName: body.strategyName,
      description: body.description,
      market: body.market,
      symbol: body.symbol,
      timeframe: body.timeframe,
      startDate: body.startDate,
      endDate: body.endDate,
      stopLossPips: body.stopLossPips || 20,
      takeProfitPips: body.takeProfitPips || 40,
      riskPerTrade: body.riskPerTrade || 1.0,
      maxTradesPerDay: body.maxTradesPerDay || 2,
      trades: [],
    });

    return NextResponse.json({ success: true, strategy: newStrategy });
  } catch (error) {
    console.error("Create strategy error:", error);
    return NextResponse.json({ error: "Failed to create strategy" }, { status: 500 });
  }
}