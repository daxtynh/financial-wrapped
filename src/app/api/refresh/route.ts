// API Route: /api/refresh
// Forces refresh of cached data for companies

import { NextRequest, NextResponse } from "next/server";
import { buildWrappedData } from "@/lib/wrapped-service";
import { getAllTickers, getCompany } from "@/data/companies";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");
  const year = parseInt(searchParams.get("year") || "2024", 10);

  // If specific ticker, refresh just that one
  if (ticker) {
    const upperTicker = ticker.toUpperCase();
    const company = getCompany(upperTicker);

    if (!company) {
      return NextResponse.json(
        { success: false, error: `Company not found: ${upperTicker}` },
        { status: 404 }
      );
    }

    try {
      const data = await buildWrappedData(upperTicker, year, true);
      return NextResponse.json({
        success: true,
        ticker: upperTicker,
        hasData: !!data,
        revenue: data?.financials?.revenue || 0,
        eps: data?.financials?.eps || 0,
        returnYTD: data?.stock?.returnYTD || 0,
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: String(error) },
        { status: 500 }
      );
    }
  }

  // Refresh all companies (careful - many API calls)
  const tickers = getAllTickers();
  const results: Array<{ ticker: string; success: boolean; revenue?: number; error?: string }> = [];

  for (const t of tickers) {
    try {
      const data = await buildWrappedData(t, year, true);
      results.push({
        ticker: t,
        success: !!data,
        revenue: data?.financials?.revenue || 0,
      });
    } catch (error) {
      results.push({
        ticker: t,
        success: false,
        error: String(error),
      });
    }

    // Rate limit - wait 200ms between calls
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const successCount = results.filter((r) => r.success).length;

  return NextResponse.json({
    success: true,
    total: tickers.length,
    refreshed: successCount,
    failed: tickers.length - successCount,
    results,
  });
}

// GET also works for single ticker refresh
export async function GET(request: NextRequest) {
  return POST(request);
}
