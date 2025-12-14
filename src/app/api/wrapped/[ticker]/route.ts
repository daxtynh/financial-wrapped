// API Route: /api/wrapped/[ticker]
// Returns WrappedData for a company

import { NextRequest, NextResponse } from "next/server";
import { buildWrappedData } from "@/lib/wrapped-service";
import { getCompany, getAllTickers } from "@/data/companies";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;
  const upperTicker = ticker.toUpperCase();

  // Validate ticker
  const company = getCompany(upperTicker);
  if (!company) {
    return NextResponse.json(
      {
        success: false,
        error: `Company not found: ${upperTicker}`,
        availableTickers: getAllTickers().slice(0, 10),
      },
      { status: 404 }
    );
  }

  // Get query params
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year") || "2024", 10);
  const forceRefresh = searchParams.get("refresh") === "true";

  try {
    const wrapped = await buildWrappedData(upperTicker, year, forceRefresh);

    if (!wrapped) {
      return NextResponse.json(
        { success: false, error: "Failed to build wrapped data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: wrapped,
    });
  } catch (error) {
    console.error("Error building wrapped:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
