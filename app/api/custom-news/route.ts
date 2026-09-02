
// src/app/api/custom-news/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import CustomTradingNewsModel from "@/models/CustomTradingNews";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const newsItems = await CustomTradingNewsModel.find({ userId: session.user.email }).sort({ date: 1, time: 1 });

    return NextResponse.json({ newsItems });
  } catch (error) {
    console.error("Fetch custom trading news error:", error);
    return NextResponse.json({ error: "Failed to fetch custom trading news" }, { status: 500 });
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

    const newsData = {
      userId: session.user.email,
      title: body.title,
      currency: body.currency,
      impact: body.impact,
      date: body.date,
      time: body.time,
      forecast: body.forecast,
      previous: body.previous,
      actual: body.actual || "",
      notes: body.notes,
    };

    let item;
    if (body._id) {
      item = await CustomTradingNewsModel.findOneAndUpdate(
        { _id: body._id, userId: session.user.email },
        newsData,
        { new: true }
      );
    }

    if (!item) {
      item = await CustomTradingNewsModel.create(newsData);
    }

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Save custom trading news error:", error);
    return NextResponse.json({ error: "Failed to save custom trading news" }, { status: 500 });
  }
}