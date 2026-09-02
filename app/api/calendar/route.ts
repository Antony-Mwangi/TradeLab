// src/app/api/calendar/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const API_KEY = process.env.TRADING_ECONOMICS_API_KEY;

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Trading Economics API key is not configured in environment variables" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const country = searchParams.get("country");
    const importance = searchParams.get("importance");

    const today = new Date();
    const startDate = start || today.toISOString().split("T")[0];
    const endDate = end || new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    let url = `https://api.tradingeconomics.com/calendar/${startDate}/${endDate}`;
    const params = new URLSearchParams();

    if (country && country !== "all") {
      params.set("country", country);
    }

    if (importance && importance !== "all") {
      params.set("importance", importance);
    }

    // Append client key or token per Trading Economics auth format
    params.set("c", API_KEY);

    const query = params.toString();
    if (query) {
      url += `?${query}`;
    }

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "Trading Economics API request failed",
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString(),
      events: data,
    });
  } catch (error) {
    console.error("Calendar API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch economic calendar data from provider" },
      { status: 500 }
    );
  }
}