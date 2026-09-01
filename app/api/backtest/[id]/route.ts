// src/app/api/backtest/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import BacktestModel from "@/models/Backtest";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const strategy = await BacktestModel.findById(resolvedParams.id);

    if (!strategy) {
      return NextResponse.json({ error: "Strategy not found" }, { status: 404 });
    }

    return NextResponse.json({ strategy });
  } catch (error) {
    console.error("Fetch strategy details error:", error);
    return NextResponse.json({ error: "Failed to load strategy workspace" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const strategy = await BacktestModel.findById(resolvedParams.id);
    if (!strategy) {
      return NextResponse.json({ error: "Strategy not found" }, { status: 404 });
    }

    const nextTradeNumber = (strategy.trades?.length || 0) + 1;

    const newTrade = {
      tradeNumber: nextTradeNumber,
      symbol: body.symbol || strategy.symbol,
      direction: body.direction,
      entryPrice: Number(body.entryPrice),
      stopLoss: Number(body.stopLoss),
      takeProfit: Number(body.takeProfit),
      resultR: Number(body.resultR),
      setup: body.setup || strategy.strategyName,
      emotion: body.emotion || "Calm",
      rulesFollowed: body.rulesFollowed ?? true,
      notes: body.notes || "",
      createdAt: new Date(),
    };

    strategy.trades.push(newTrade as any);
    await strategy.save();

    return NextResponse.json({ success: true, strategy });
  } catch (error) {
    console.error("Log backtest trade error:", error);
    return NextResponse.json({ error: "Failed to record backtest trade" }, { status: 500 });
  }
}