// src/app/api/journal/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import JournalModel from "@/models/Journal";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const assetType = url.searchParams.get("assetType") || "all";

    const query: Record<string, any> = { userId: session.user.email };

    if (assetType !== "all") {
      query.assetType = assetType;
    }

    if (search) {
      query.$or = [
        { asset: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }

    const journals = await JournalModel.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ journals }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching journals:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { asset, assetType, tradeType, entryPrice, exitPrice, pnl, notes, imageUrl } = body;

    if (!asset || !assetType || !tradeType || entryPrice === undefined || exitPrice === undefined || pnl === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const newJournal = await JournalModel.create({
      userId: session.user.email,
      asset,
      assetType,
      tradeType,
      entryPrice: Number(entryPrice),
      exitPrice: Number(exitPrice),
      pnl: Number(pnl),
      notes,
      imageUrl, // <-- Added imageUrl mapping
    });

    return NextResponse.json({ journal: newJournal }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}