// src/app/api/trading-plan/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import TradingPlanModel from "@/models/TradingPlan";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await connectToDatabase();
    const plan = await TradingPlanModel.findOne({
      _id: id,
      userId: session.user.email,
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("Fetch single plan error:", error);
    return NextResponse.json({ error: "Failed to fetch plan" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await connectToDatabase();
    const deleted = await TradingPlanModel.findOneAndDelete({
      _id: id,
      userId: session.user.email,
    });

    if (!deleted) {
      return NextResponse.json({ error: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete plan error:", error);
    return NextResponse.json({ error: "Failed to delete plan" }, { status: 500 });
  }
}