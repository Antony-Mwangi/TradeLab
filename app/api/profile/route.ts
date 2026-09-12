// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import User from "@/models/User";

// ===== GET /api/profile =====
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let profile = await Profile.findOne({ userId: user._id.toString() });

    if (!profile) {
      profile = await Profile.create({
        userId: user._id.toString(),
        fullName: user.name || "",
        baseCurrency: "USD",
        timezone: "UTC",
      });
    }

    return NextResponse.json({
      profile,
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("[PROFILE_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// ===== PUT /api/profile =====
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const allowedFields = [
      "fullName", "bio", "experience", "primaryMarket", "tradingStyle",
      "tradingSessions", "riskPreference", "baseCurrency", "timezone",
      "accountSize", "goals", "psychologyFocus",
    ];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: user._id.toString() },
      { $set: updateData },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("[PROFILE_PUT]", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}