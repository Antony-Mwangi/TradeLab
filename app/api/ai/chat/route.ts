// src/app/api/ai/chat/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import JournalModel from "@/models/Journal";
import TradingPlanModel from "@/models/TradingPlan";
import { getTradingAIResponse } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();
    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Retrieve user's actual database records for context
    const journals = await JournalModel.find({ userId: session.user.email }).sort({ date: -1 }).limit(30);
    const plans = await TradingPlanModel.find({ userId: session.user.email });

    const contextData = {
      userEmail: session.user.email,
      totalRecordedTrades: journals.length,
      recentTrades: journals,
      tradingPlans: plans,
    };

    const userContext = JSON.stringify(contextData, null, 2);
    const aiResponse = await getTradingAIResponse(prompt, userContext);

    return NextResponse.json({ success: true, response: aiResponse });
  } catch (error) {
    console.error("AI Chat API error:", error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}