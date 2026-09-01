// src/app/api/journal/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import JournalModel from "@/models/Journal";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // Await the params promise in Next.js 15+
    const { id } = await params;

    const journal = await JournalModel.findOne({ _id: id, userId: session.user.email }).lean();

    if (!journal) {
      return NextResponse.json({ error: "Trade entry not found" }, { status: 404 });
    }

    return NextResponse.json({ journal }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching trade details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // Await the params promise in Next.js 15+
    const { id } = await params;

    const deletedJournal = await JournalModel.findOneAndDelete({
      _id: id,
      userId: session.user.email,
    });

    if (!deletedJournal) {
      return NextResponse.json({ error: "Trade entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Trade deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting trade entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}