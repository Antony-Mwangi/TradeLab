// src/app/api/custom-news/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import CustomTradingNewsModel from "@/models/CustomTradingNews";

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
    const deleted = await CustomTradingNewsModel.findOneAndDelete({
      _id: id,
      userId: session.user.email,
    });

    if (!deleted) {
      return NextResponse.json({ error: "News item not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete custom trading news error:", error);
    return NextResponse.json({ error: "Failed to delete news item" }, { status: 500 });
  }
}